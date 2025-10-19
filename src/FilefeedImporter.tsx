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
    <div className="container">
      <section className="hero">
        <h1>Filefeed Importer</h1>
        <p>Drop in a fast, friendly CSV/XLSX importer.</p>
        <div className="cta-row">
          <OpenImporterButton onClick={() => (open ? closePortal() : openPortal())}>
            {open === true ? "Close Importer" : "Open Importer"}
          </OpenImporterButton>
          <a className="cta-link" href={process.env.PUBLIC_URL + "/getting-started.csv"} download>
            Download sample CSV
          </a>
        </div>
      </section>

      <ul className="feature-list">
        <li>Drag & drop files</li>
        <li>Smart column mapping</li>
        <li>Inline validations</li>
      </ul>

      <div className="content">
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


