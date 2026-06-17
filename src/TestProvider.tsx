import { getActiveProvider } from "./store/providerStore";

export default function TestProvider() {
  const provider = getActiveProvider();

  return (
    <pre style={{color:"white"}}>
      {JSON.stringify(provider,null,2)}
    </pre>
  );
}
