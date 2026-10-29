// Build sem dependências: copia index.html e src/ para dist/.
import { cpSync, rmSync, mkdirSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
cpSync("index.html", "dist/index.html");
cpSync("src", "dist/src", { recursive: true });
console.log("Build concluído em dist/");
