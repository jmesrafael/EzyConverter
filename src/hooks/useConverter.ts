import { useState, useCallback, useMemo } from "react";

export interface UnitDefinition {
  key: string;
  label: string;
  factor: number; // relative to base unit
}

export interface ConversionResult {
  value: number;
  formula: string;
}

export interface ConverterState {
  input: string;
  unitFrom: string;
  unitTo: string;
  precision: number;
  history: { input: string; unitFrom: string; unitTo: string; result: string }[];
}

export function useConverter(units: UnitDefinition[]) {
  const [state, setState] = useState<ConverterState>({
    input: "",
    unitFrom: units[0]?.key ?? "",
    unitTo: units[1]?.key ?? "",
    precision: 4,
    history: [],
  });

  const setInput = useCallback((v: string) => setState((s) => ({ ...s, input: v })), []);
  const setUnitFrom = useCallback((v: string) => setState((s) => ({ ...s, unitFrom: v })), []);
  const setUnitTo = useCallback((v: string) => setState((s) => ({ ...s, unitTo: v })), []);
  const setPrecision = useCallback((v: number) => setState((s) => ({ ...s, precision: v })), []);

  const swapUnits = useCallback(() => {
    setState((s) => ({ ...s, unitFrom: s.unitTo, unitTo: s.unitFrom }));
  }, []);

  const clearInput = useCallback(() => setState((s) => ({ ...s, input: "" })), []);

  const result = useMemo<ConversionResult | null>(() => {
    const val = parseFloat(state.input);
    if (isNaN(val)) return null;
    const from = units.find((u) => u.key === state.unitFrom);
    const to = units.find((u) => u.key === state.unitTo);
    if (!from || !to) return null;
    const converted = val * (from.factor / to.factor);
    const rounded = parseFloat(converted.toFixed(state.precision));
    return {
      value: rounded,
      formula: `${val} ${from.label} × (${from.factor} / ${to.factor}) = ${rounded} ${to.label}`,
    };
  }, [state.input, state.unitFrom, state.unitTo, state.precision, units]);

  const addToHistory = useCallback(() => {
    if (!result) return;
    setState((s) => ({
      ...s,
      history: [
        { input: s.input, unitFrom: s.unitFrom, unitTo: s.unitTo, result: String(result.value) },
        ...s.history.slice(0, 19),
      ],
    }));
  }, [result]);

  return { state, setInput, setUnitFrom, setUnitTo, setPrecision, swapUnits, clearInput, result, addToHistory };
}
