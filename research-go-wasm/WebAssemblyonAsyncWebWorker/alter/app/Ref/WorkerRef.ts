import { Remote } from "comlink";
import { useRef } from "hono/jsx";

const workerRef = useRef<Remote<typeof import("../worker/send")>| null>(null)
export default workerRef