const dynamicImport = new Function('specifier', 'return import(specifier)') as (
  specifier: string
) => Promise<any>;

let nodeModulePromise: Promise<{
  toNodeHandler: (auth: any) => (req: any, res: any) => Promise<any>;
  fromNodeHeaders: (headers: any) => Headers;
}> | null = null;

export async function getBetterAuthNode() {
  if (!nodeModulePromise) {
    nodeModulePromise = dynamicImport('better-auth/node');
  }
  return nodeModulePromise;
}

export function fromNodeHeaders(nodeHeaders: any): Headers {
  const webHeaders = new Headers();
  if (!nodeHeaders || typeof nodeHeaders !== 'object') {
    return webHeaders;
  }

  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => webHeaders.append(key, String(v)));
      } else {
        webHeaders.set(key, String(value));
      }
    }
  }
  return webHeaders;
}
