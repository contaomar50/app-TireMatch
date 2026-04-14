import { GoogleGenAI, Type } from "@google/genai";
import { VehicleTireData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getTireData(vehicleReference: string, tireType: string = "mixta"): Promise<VehicleTireData> {
  const prompt = `Identifica las medidas de llantas recomendadas para el vehículo: "${vehicleReference}". 
  El usuario busca llantas de tipo: "${tireType}" (off road, mixta o pistera).
  Genera también una cotización ficticia pero realista con al menos 5 marcas diferentes, incluyendo marcas premium (ej. Michelin, Bridgestone) y marcas más económicas (ej. Linglong, Westlake, Triangle) para mostrar un rango de precios de gama alta y baja.
  Incluye precios aproximados en Pesos Colombianos (COP).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          vehicle: { type: Type.STRING },
          recommendedSizes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                size: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["size", "description"]
            }
          },
          quotes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                brand: { type: Type.STRING },
                model: { type: Type.STRING },
                price: { type: Type.NUMBER },
                currency: { type: Type.STRING },
                availability: { type: Type.STRING }
              },
              required: ["brand", "model", "price", "currency", "availability"]
            }
          }
        },
        required: ["vehicle", "recommendedSizes", "quotes"]
      }
    }
  });

  return JSON.parse(response.text || "{}") as VehicleTireData;
}
