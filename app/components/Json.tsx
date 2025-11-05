"use client";

import { useState } from "react";

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

interface JsonViewerProps {
  data: unknown;
  name?: string;
  defaultExpanded?: boolean;
}

interface JsonNodeProps {
  value: JsonValue;
  name?: string;
  isLast?: boolean;
  level?: number;
  defaultExpanded?: boolean;
}

const INDENT_SIZE = 16;

const JsonNode = ({
  value,
  name,
  isLast = true,
  level = 0,
  defaultExpanded = true,
}: JsonNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const getValueType = (val: JsonValue): string => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  };

  const valueType = getValueType(value);
  const isExpandable = valueType === "object" || valueType === "array";
  const isEmpty =
    (valueType === "object" && Object.keys(value as object).length === 0) ||
    (valueType === "array" && (value as JsonValue[]).length === 0);

  const renderPrimitive = (val: JsonValue) => {
    if (val === null) {
      return <span className="text-blue-400">null</span>;
    }
    if (typeof val === "boolean") {
      return <span className="text-blue-400">{String(val)}</span>;
    }
    if (typeof val === "number") {
      return <span className="text-green-400">{val}</span>;
    }
    if (typeof val === "string") {
      return <span className="text-orange-300">"{val}"</span>;
    }
    return null;
  };

  const renderExpandable = () => {
    const isArray = valueType === "array";
    const entries = isArray
      ? (value as JsonValue[]).map((v, i) => [i, v] as const)
      : Object.entries(value as { [key: string]: JsonValue });

    const openBracket = isArray ? "[" : "{";
    const closeBracket = isArray ? "]" : "}";
    const count = entries.length;

    if (isEmpty) {
      return (
        <>
          <span className="text-gray-400">{openBracket}</span>
          <span className="text-gray-400">{closeBracket}</span>
        </>
      );
    }

    return (
      <div>
        <div className="inline-flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:bg-gray-700/50 rounded px-0.5 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <span className="text-gray-400 text-xs select-none">
              {isExpanded ? "▼" : "▶"}
            </span>
          </button>
          <span className="text-gray-400">{openBracket}</span>
          {!isExpanded && (
            <>
              <span className="text-gray-500 text-xs">
                {count} {isArray ? "items" : "keys"}
              </span>
              <span className="text-gray-400">{closeBracket}</span>
            </>
          )}
        </div>

        {isExpanded && (
          <>
            <div>
              {entries.map(([key, val], index) => (
                <JsonNode
                  key={String(key)}
                  name={isArray ? undefined : String(key)}
                  value={val}
                  isLast={index === entries.length - 1}
                  level={level + 1}
                  defaultExpanded={level < 1}
                />
              ))}
            </div>
            <div style={{ paddingLeft: `${level * INDENT_SIZE}px` }}>
              <span className="text-gray-400">{closeBracket}</span>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      className="font-mono text-sm leading-relaxed"
      style={{ paddingLeft: `${level * INDENT_SIZE}px` }}
    >
      {name !== undefined && (
        <>
          <span className="text-cyan-300">"{name}"</span>
          <span className="text-gray-400">: </span>
        </>
      )}
      {isExpandable ? renderExpandable() : renderPrimitive(value)}
      {!isLast && <span className="text-gray-400">,</span>}
    </div>
  );
};

export const JsonViewer = ({
  data,
  name,
  defaultExpanded = true,
}: JsonViewerProps) => {
  let jsonValue: JsonValue;

  try {
    // Convert data to JSON and back to ensure it's valid JSON
    const JSONParser = globalThis.JSON;
    jsonValue =
      typeof data === "string"
        ? JSONParser.parse(data)
        : JSONParser.parse(JSONParser.stringify(data));
  } catch (error) {
    return (
      <div className="bg-gray-900 text-red-400 p-4 rounded-lg font-mono text-sm">
        Error: Invalid JSON data
      </div>
    );
  }

  return (
    <div className="bg-[#1e1e1e] text-gray-200 p-4 rounded-lg overflow-auto max-h-[600px] border border-gray-700">
      <JsonNode
        value={jsonValue}
        name={name}
        defaultExpanded={defaultExpanded}
      />
    </div>
  );
};

// Export as JSON for backward compatibility
export const JSON = JsonViewer;
