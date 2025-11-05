"use client";

import { useState } from "react";

/**
 * Represents any valid JSON value type
 * Supports primitives, arrays, and nested objects
 */
type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * Props for the main JsonViewer component
 */
interface JsonViewerProps {
  data: unknown;
  name?: string;
  defaultExpanded?: boolean;
}

/**
 * Props for individual JSON node rendering
 */
interface JsonNodeProps {
  value: JsonValue;
  name?: string;
  isLast?: boolean;
  level?: number;
  defaultExpanded?: boolean;
}

/** Number of pixels to indent each nesting level */
const INDENT_SIZE = 16;

/**
 * Recursive component that renders a single JSON node
 * Handles both primitive values and expandable objects/arrays
 */
const JsonNode = ({
  value,
  name,
  isLast = true,
  level = 0,
  defaultExpanded = true,
}: JsonNodeProps) => {
  // Track whether this node is expanded (for objects/arrays)
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  /**
   * Determines the JSON type of a value
   * @returns "null" | "array" | "string" | "number" | "boolean" | "object"
   */
  const getValueType = (val: JsonValue): string => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  };

  const valueType = getValueType(value);
  // Arrays start with 3 visible items, objects with 6 visible keys
  const initialVisibleCount = valueType === "array" ? 3 : 6;
  // Track how many items are currently visible (for pagination)
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const isExpandable = valueType === "object" || valueType === "array";
  const isEmpty =
    (valueType === "object" && Object.keys(value as object).length === 0) ||
    (valueType === "array" && (value as JsonValue[]).length === 0);

  /**
   * Renders primitive JSON values (string, number, boolean, null)
   * with appropriate syntax highlighting colors
   */
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

  /**
   * Renders expandable objects and arrays with pagination support
   * Shows a limited number of items initially with "show more" button
   */
  const renderExpandable = () => {
    const isArray = valueType === "array";
    // Convert to entries format: [key, value] pairs
    const entries = isArray
      ? (value as JsonValue[]).map((v, i) => [i, v] as const)
      : Object.entries(value as { [key: string]: JsonValue });

    const openBracket = isArray ? "[" : "{";
    const closeBracket = isArray ? "]" : "}";
    const count = entries.length;
    const hasMore = visibleCount < count;
    // Only show a subset of entries based on current visible count
    const visibleEntries = entries.slice(0, visibleCount);

    // Render empty arrays/objects inline
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
        {/* Expandable header with toggle button */}
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
          {/* When collapsed, show item count */}
          {!isExpanded && (
            <>
              <span className="text-gray-500 text-xs">
                {count} {isArray ? "items" : "keys"}
              </span>
              <span className="text-gray-400">{closeBracket}</span>
            </>
          )}
        </div>

        {/* When expanded, show visible entries and pagination */}
        {isExpanded && (
          <>
            <div>
              {/* Render each visible entry recursively */}
              {visibleEntries.map(([key, val], index) => (
                <JsonNode
                  key={String(key)}
                  name={isArray ? undefined : String(key)}
                  value={val}
                  isLast={index === visibleEntries.length - 1 && !hasMore}
                  level={level + 1}
                  defaultExpanded={level < 1}
                />
              ))}
              {/* Show "load more" button if there are hidden items */}
              {hasMore && (
                <div
                  style={{ paddingLeft: `${(level + 1) * INDENT_SIZE}px` }}
                  className="py-1"
                >
                  <button
                    type="button"
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                    className="text-blue-400 hover:text-blue-300 text-xs underline decoration-dotted transition-colors"
                  >
                    {/* Show count of items in next batch and total remaining */}
                    ... show {Math.min(3, count - visibleCount)} more (
                    {count - visibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
            {/* Closing bracket */}
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
      {/* Render property name for object keys */}
      {name !== undefined && (
        <>
          <span className="text-cyan-300">"{name}"</span>
          <span className="text-gray-400">: </span>
        </>
      )}
      {/* Render the value (either expandable or primitive) */}
      {isExpandable ? renderExpandable() : renderPrimitive(value)}
      {/* Add trailing comma for all items except the last */}
      {!isLast && <span className="text-gray-400">,</span>}
    </div>
  );
};

/**
 * Main JsonViewer component
 * Displays JSON data with syntax highlighting, collapsible sections, and pagination
 *
 * Features:
 * - Syntax highlighting for different value types
 * - Expandable/collapsible objects and arrays
 * - Pagination: arrays show 3 items initially, objects show 6 keys
 * - "Show more" button to load additional items in batches of 3
 * - Validates and parses JSON data before rendering
 *
 * @param data - The data to display (can be object, array, or JSON string)
 * @param name - Optional root property name
 * @param defaultExpanded - Whether to expand the root node by default
 */
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
