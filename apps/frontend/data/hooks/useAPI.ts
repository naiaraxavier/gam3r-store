import { useCallback } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const useAPI = () => {
  const httpGet = useCallback(async (path: string) => {
    const uri = path.startsWith("/") ? path : `/${path}`;
    const urlComplete = `${baseUrl}${uri}`;

    const response = await fetch(urlComplete);
    return extractData(response);
  }, []);

  const httpPost = useCallback(async (path: string, body: any) => {
    const uri = path.startsWith("/") ? path : `/${path}`;
    const urlComplete = `${baseUrl}${uri}`;

    const response = await fetch(urlComplete, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return extractData(response);
  }, []);

  const extractData = async (response: Response) => {
    let content = "";
    try {
      content = await response.text();
      return JSON.parse(content);
    } catch (e) {
      console.error(e);
      return content;
    }
  };

  return { httpGet, httpPost };
};
