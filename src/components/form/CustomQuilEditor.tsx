/* eslint-disable @typescript-eslint/no-explicit-any */
import JoditEditor from "jodit-react";
import { Controller } from "react-hook-form";

type TProps = {
  label: string;
  name: string;
  height?: number;
  control: any;
  placeholder?: string;
};

const CustomQuilEditor = ({ label, name, control, height = 200, placeholder= "Write here..", }: TProps) => {
  const config = {
    readonly: false,
    height: height,
    placeholder: placeholder,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "paragraph",
      "|",
      "table",
      "link",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
    toolbarAdaptive: false,
       enter: "P",
    defaultActionOnPaste: "insert_as_html",
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPasteFromWord: "insert_as_html",
    processPasteHTML: true,
    // Add custom CSS for lists
    extraCSS: `
      .jodit-wysiwyg ol {
        list-style-type: decimal;
        margin-left: 20px;
        padding-left: 20px;
      }
      .jodit-wysiwyg ul {
        list-style-type: disc;
        margin-left: 20px;
        padding-left: 20px;
      }
      .jodit-wysiwyg ol li,
      .jodit-wysiwyg ul li {
        margin-bottom: 5px;
        display: list-item;
      }
      .jodit-wysiwyg ol ol {
        list-style-type: lower-alpha;
      }
      .jodit-wysiwyg ol ol ol {
        list-style-type: lower-roman;
      }
    `,
    // Enable list formatting
    controls: {
      ol: {
        command: 'insertOrderedList',
        tags: ['ol'],
        tooltip: 'Insert Ordered List'
      },
      ul: {
        command: 'insertUnorderedList', 
        tags: ['ul'],
        tooltip: 'Insert Unordered List'
      }
    }
  };

  return (
    <>
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <JoditEditor
                value={value || ""}
                config={config as any}
                onBlur={() => {}}
                onChange={(newContent) => onChange(newContent)}
              />
              {error && (
                <p className="text-red-600 text-sm mt-1">{error.message}</p>
              )}
            </>
          )}
        />

            {/* Additional CSS to ensure list styles are applied */}
      <style>{`
        .jodit-container .jodit-wysiwyg ol {
          list-style-type: decimal !important;
          margin-left: 20px !important;
          padding-left: 20px !important;
        }
        
        .jodit-container .jodit-wysiwyg ul {
          list-style-type: disc !important;
          margin-left: 20px !important;
          padding-left: 20px !important;
        }
        
        .jodit-container .jodit-wysiwyg ol li,
        .jodit-container .jodit-wysiwyg ul li {
          display: list-item !important;
          margin-bottom: 5px !important;
        }
        
        .jodit-container .jodit-wysiwyg ol ol {
          list-style-type: lower-alpha !important;
        }
        
        .jodit-container .jodit-wysiwyg ol ol ol {
          list-style-type: lower-roman !important;
        }
      `}</style>
      </div>
    </>
  );
};

export default CustomQuilEditor;
