import { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightLeft, Copy, Check, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { MainLayout } from "@/components/MainLayout";
import { SEOHead } from "@/components/SEOHead";
import { ConversionTable } from "@/components/converter/ConversionTable";
import { findUnitBySlug } from "@/lib/conversionData";
import { convertValue } from "@/lib/convert";
import { generateSEOContent } from "@/lib/generateSEOContent";
import { generateFAQSchema, generateBreadcrumbSchema, generateToolSchema } from "@/lib/schema";
import { useConversionHistory } from "@/hooks/useConversionHistory";
import { Slider } from "@/components/ui/slider";

const DynamicConverter = () => {
  const { pair } = useParams<{ pair: string }>();
  const [searchParams] = useSearchParams();

  // Parse from-to from URL
  const parts = pair?.split("-to-") ?? [];
  const fromSlug = parts[0] ?? "";
  const toSlug = parts[1] ?? "";

  const fromInfo = findUnitBySlug(fromSlug);
  const toInfo = findUnitBySlug(toSlug);

  const initialValue = searchParams.get("value") ?? "";
  const [input, setInput] = useState(initialValue);
  const [precision, setPrecision] = useState(4);
  const [copied, setCopied] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const { addEntry } = useConversionHistory();

  // Update input when URL value changes
  useEffect(() => {
    const v = searchParams.get("value");
    if (v) setInput(v);
  }, [searchParams]);

  const result = useMemo(() => {
    const val = parseFloat(input);
    if (isNaN(val) || !fromInfo || !toInfo) return null;
    return convertValue(val, fromSlug, toSlug, precision);
  }, [input, fromSlug, toSlug, precision, fromInfo, toInfo]);

  const seo = useMemo(() => {
    if (!fromInfo || !toInfo) return null;
    return generateSEOContent(fromInfo.unit, toInfo.unit, fromInfo.category);
  }, [fromInfo, toInfo]);

  if (!fromInfo || !toInfo || !seo) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Converter Not Found</h1>
          <p className="text-muted-foreground mb-6">The conversion "{pair}" is not supported.</p>
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </div>
      </MainLayout>
    );
  }

  const fromName = fromInfo.unit.label.split(" (")[0];
  const toName = toInfo.unit.label.split(" (")[0];

  const schema = {
    ...generateToolSchema(seo.title, seo.metaDescription, `https://ezyconverter.com/${pair}`),
    ...generateFAQSchema(seo.faqs),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://ezyconverter.com/" },
    { name: fromInfo.category.label, url: `https://ezyconverter.com${fromInfo.category.route}` },
    { name: `${fromName} to ${toName}`, url: `https://ezyconverter.com/${pair}` },
  ]);

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(String(result.value));
    setCopied(true);
    addEntry({
      input,
      fromUnit: fromInfo.unit.key,
      toUnit: toInfo.unit.key,
      result: String(result.value),
      category: fromInfo.category.key,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    const url = `${window.location.origin}/${pair}${input ? `?value=${input}` : ""}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapUrl = `/${toInfo.unit.slug}-to-${fromInfo.unit.slug}${input ? `?value=${result?.value ?? ""}` : ""}`;

  return (
    <MainLayout>
      <SEOHead title={seo.title} description={seo.metaDescription} schema={schema} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="container py-12 md:py-20 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to={fromInfo.category.route} className="hover:text-foreground">{fromInfo.category.label}</Link>
          <span>/</span>
          <span className="text-foreground">{fromName} to {toName}</span>
        </nav>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{seo.h1}</h1>
          <p className="text-muted-foreground mb-8">{seo.explanation}</p>
        </motion.div>

        {/* Converter Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
          <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <label className="block text-sm font-medium mb-1.5">{fromName}</label>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter value"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <Link to={swapUrl} className="self-center p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors" aria-label="Swap units">
              <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            </Link>

            <div>
              <label className="block text-sm font-medium mb-1.5">{toName}</label>
              <div className="w-full rounded-md border border-input bg-muted px-3 py-2 text-sm font-medium min-h-[38px] flex items-center">
                {result ? (
                  <motion.span key={result.value} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-primary font-semibold">
                    {result.value}
                  </motion.span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </div>
            </div>
          </div>

          {result && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground font-mono">
              {result.formula}
            </motion.div>
          )}

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <button onClick={copyResult} disabled={!result} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={shareUrl} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors">
              <Share2 className="w-3 h-3" /> Share Link
            </button>
          </div>

          <div className="mt-4">
            <label className="block text-xs text-muted-foreground mb-1">Decimal places: {precision}</label>
            <Slider value={[precision]} onValueChange={([v]) => setPrecision(v)} min={0} max={10} step={1} className="w-40" />
          </div>
        </motion.div>

        {/* Conversion Table */}
        <div className="glass-card p-4 mb-6">
          <button onClick={() => setShowTable(!showTable)} className="flex items-center gap-2 w-full text-sm font-medium">
            {fromName} to {toName} Table
            {showTable ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
          </button>
          {showTable && (
            <div className="mt-3">
              <ConversionTable fromLabel={fromName} toLabel={toName} rows={seo.conversionTable} />
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="glass-card p-4 mb-6">
          <button onClick={() => setShowFaq(!showFaq)} className="flex items-center gap-2 w-full text-sm font-medium">
            Frequently Asked Questions
            {showFaq ? <ChevronUp className="w-4 h-4 ml-auto" /> : <ChevronDown className="w-4 h-4 ml-auto" />}
          </button>
          {showFaq && (
            <div className="mt-3 space-y-4">
              {seo.faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold mb-1">{faq.q}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related conversions */}
        <div className="glass-card p-4">
          <h2 className="text-sm font-medium mb-3">Related Conversions</h2>
          <div className="flex flex-wrap gap-2">
            {fromInfo.category.units
              .filter((u) => u.key !== fromInfo.unit.key)
              .slice(0, 6)
              .map((u) => (
                <Link
                  key={u.key}
                  to={`/${fromInfo.unit.slug}-to-${u.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-secondary/80 transition-colors"
                >
                  {fromName} → {u.label.split(" (")[0]}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DynamicConverter;
