import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAquFxsypiLoWyCBsGIv7iuRreKw7ngrrs";

export async function generateBotResponse(userMessage) {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: userMessage + ". Hãy trình bày định dạng cho đẹp, xuống dòng tách đoạn cho đẹp",
            config: {
                maxOutputTokens: 500,
                temperature: 0.1,
            },
        });
        return response.text;
    } catch (error) {
        return "Có lỗi xảy ra, vui lòng thử lại sau ⚠";
    }
}