import { useEffect, useRef, useState } from "react";
import { CONFIG } from "../config";
import Icon from "../components/Icon";

function Preview({ item, lazy }) {
  if (item.src) {
    return (
      <img
        src={item.src}
        alt={item.alt || item.title}
        width={600}
        height={800}
        loading={lazy ? "lazy" : undefined}
      />
    );
  }
  return (
    <div className="prev-ph">
      <Icon name="image" />
      <b>SUBSTITUIR IMAGEM</b>
      <span>Prévia real do guia a ser inserida</span>
    </div>
  );
}

function Modal({ item, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-top">
          <b id="modal-title">{item.title}</b>
          <button ref={closeRef} className="x-btn" type="button" aria-label="Fechar" onClick={onClose}>
            <Icon name="x" />
          </button>
        </div>
        <div className="modal-body">
          {item.src ? (
            <Preview item={item} />
          ) : (
            <div className="prev-frame">
              <Preview item={item} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Previews() {
  return (
    <section className="section theme-red" aria-labelledby="h-prev">
      <div className="wrap">
        <div className="section-head">
          <h2 id="h-prev">Vem ser feliz!</h2>
          <p>Depoimentos</p>
        </div>
        <div className="prev-grid social-proof-grid">
          {["nNVqRX1", "0owGOcw", "pBb1E1C"].map((imageId, index) => (
            <div className="prev-frame social-proof-image" key={imageId}>
              <img
                src={`https://i.imgur.com/${imageId}.jpg`}
                alt={`Foto de depoimento ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
