// Auto-generates SEO content for programmatic converter pages
import type { UnitDef, CategoryDef } from "./conversionData";
import { convertValue } from "./convert";

export interface SEOContent {
  title: string;
  metaDescription: string;
  h1: string;
  explanation: string;
  formulaText: string;
  faqs: { q: string; a: string }[];
  conversionTable: { from: number; to: string }[];
}

export function generateSEOContent(
  from: UnitDef,
  to: UnitDef,
  category: CategoryDef
): SEOContent {
  const fromName = from.label.split(" (")[0];
  const toName = to.label.split(" (")[0];

  const title = `${fromName} to ${toName} Converter | Ezy Converter`;
  const metaDescription = `Convert ${fromName} to ${toName} instantly. Free online ${category.label.toLowerCase()} converter with formula, conversion table, and examples.`;
  const h1 = `Convert ${fromName} to ${toName}`;

  // Generate example conversion for explanation
  const example = convertValue(1, from.slug, to.slug);
  const exampleVal = example ? example.value : "?";

  const explanation = `To convert ${fromName} to ${toName}, ${
    category.custom
      ? `use the specific conversion formula for ${category.label.toLowerCase()} units.`
      : `multiply the value by the conversion factor (${from.factor} / ${to.factor}).`
  } For example, 1 ${fromName} equals ${exampleVal} ${toName}.`;

  const formulaText = category.custom
    ? example?.formula ?? `${fromName} → ${toName} (special formula)`
    : `${toName} = ${fromName} × (${from.factor} / ${to.factor})`;

  // Conversion table
  const sampleValues = [1, 2, 5, 10, 25, 50, 100, 500, 1000];
  const conversionTable = sampleValues.map((v) => {
    const r = convertValue(v, from.slug, to.slug);
    return { from: v, to: r ? String(r.value) : "—" };
  });

  // FAQs
  const faqs = [
    {
      q: `How many ${toName.toLowerCase()}s are in a ${fromName.toLowerCase()}?`,
      a: `1 ${fromName} is equal to ${exampleVal} ${toName}.`,
    },
    {
      q: `How do you convert ${fromName.toLowerCase()} to ${toName.toLowerCase()}?`,
      a: explanation,
    },
    {
      q: `What is the formula for ${fromName.toLowerCase()} to ${toName.toLowerCase()}?`,
      a: `The formula is: ${formulaText}`,
    },
  ];

  return { title, metaDescription, h1, explanation, formulaText, faqs, conversionTable };
}
