import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Eager load Home for fast initial paint
import Home from "./pages/Home";

// Lazy load all converter pages for optimal bundle splitting
const ImageConverter = lazy(() => import("./pages/ImageConverter"));
const PDFConverter = lazy(() => import("./pages/PDFConverter"));
const LengthConverter = lazy(() => import("./pages/LengthConverter"));
const WeightConverter = lazy(() => import("./pages/WeightConverter"));
const TemperatureConverter = lazy(() => import("./pages/TemperatureConverter"));
const TimeConverter = lazy(() => import("./pages/TimeConverter"));
const DataConverter = lazy(() => import("./pages/DataConverter"));
const MathConverters = lazy(() => import("./pages/MathConverters"));
const EngineeringConverters = lazy(() => import("./pages/EngineeringConverters"));
const DynamicConverter = lazy(() => import("./pages/DynamicConverter"));
const GuidesPage = lazy(() => import("./pages/GuidesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("./pages/TermsOfUse"));
const SettingsPage = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image-converter" element={<ImageConverter />} />
            <Route path="/pdf-converter" element={<PDFConverter />} />
            <Route path="/length-converter" element={<LengthConverter />} />
            <Route path="/weight-converter" element={<WeightConverter />} />
            <Route path="/temperature-converter" element={<TemperatureConverter />} />
            <Route path="/time-converter" element={<TimeConverter />} />
            <Route path="/data-converter" element={<DataConverter />} />
            <Route path="/math-converters" element={<MathConverters />} />
            <Route path="/engineering-converters" element={<EngineeringConverters />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* Dynamic programmatic converter pages */}
            <Route path="/:pair" element={<DynamicConverter />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
