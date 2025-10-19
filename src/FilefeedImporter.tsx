import type React from "react";
import { FilefeedProvider, FilefeedSheet, useFilefeed, useFilefeedEvent, type Filefeed } from "@filefeed/react";

const sheetConfig: Filefeed.SheetConfig = {
  name: "Sheet",
  slug: "sheet",
  fields: [
    { key: "firstName", type: "string", label: "First Name" },
    { key: "lastName", type: "string", label: "Last Name" },
    { key: "color", type: "string", label: "Color" },
    { key: "email", type: "string", label: "Email" },
  ],
};

function OpenImporterButton({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>; children: React.ReactNode; }) {
  return (
    <button className="importer-button" onClick={onClick}>
      {children}
      <svg width="3" height="24" viewBox="0 -9 3 24" className="button-arrow">
        <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
      </svg>
    </button>
  );
}

function Inner() {
  const { open, openPortal, closePortal } = useFilefeed();

  useFilefeedEvent(
    "job:outcome-acknowledged",
    { operation: `sheetSubmitAction-${sheetConfig.slug}`, status: "complete" },
    () => closePortal()
  );

  return (
    <div className="content">
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <OpenImporterButton onClick={() => (open ? closePortal() : openPortal())}>
          {open === true ? "Close Importer" : "Open Importer"}
        </OpenImporterButton>
        {open === true && (
          <button
            onClick={closePortal}
            style={{
              position: "fixed",
              top: "12px",
              right: "12px",
              background: "white",
              border: "1px solid #e1e5e9",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            }}
          >
            Exit
          </button>
        )}
      </div>

      <FilefeedSheet
        config={sheetConfig}
        onSubmit={async (sheet) => {
          console.log("on Workbook Submit ", { sheet });
        }}
        onRecordHook={(record) => {
          record.set("lastName", "Rock");
          return record;
        }}
      />
    </div>
  );
}

export default function FilefeedImporter() {
  return (
    <FilefeedProvider>
      <Inner />
    </FilefeedProvider>
  );
}


