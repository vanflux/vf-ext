import { entry } from "app-background";

if (AUTO_RELOADER) require("./auto-reloader-plugin");

entry?.();
