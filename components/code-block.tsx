import { Highlight, themes, type Language } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <Highlight
      theme={themes.vsDark}
      code={code.trim()}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} overflow-x-auto rounded-2xl bg-[#0d0d0f] p-4 text-sm leading-6 shadow-[var(--neo-inset)]`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
