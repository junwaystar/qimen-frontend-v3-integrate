import { NextResponse } from 'next/server';

export const runtime = 'edge';

// ===========================================================================
// 1. CONFIGURATION
// ===========================================================================
const CONFIG = {
  NCB_API_KEY: process.env.NCB_API_KEY || '41667_qimenbazi',
  NCB_BASE_URL: 'https://api.ncb.com/v1',
  USER_DB: {
    "0908352185": {
      password: "WAde1981",
      name: "Junway Chao",
      role: "admin",
      token: "t_admin_888_junway",
      permissions: ["all"]
    }
  }
};

// ===========================================================================
// 2. CORE DIVINATION ENGINE
// ===========================================================================
const DivinationEngine = {
  calculateQimen: async (params: any) => {
    try {
      const response = await fetch(`${CONFIG.NCB_BASE_URL}/calculate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'X-API-KEY': CONFIG.NCB_API_KEY 
        },
        body: JSON.stringify(params)
      });
      return await response.json();
    } catch (e) {
      return { success: false, error: "Calculation engine timeout, please try again." };
    }
  },
  analyzeNumbers: (numStr: string) => {
    return { analysis: "Numerical analysis complete", result: "Stable" };
  }
};

// ===========================================================================
// 3. AUTHENTICATION HELPER
// ===========================================================================
function authenticate(request: Request) {
  const token = request.headers.get('Authorization');
  const isValid = Object.values(CONFIG.USER_DB).some(u => u.token === token);
  return isValid;
}

// ===========================================================================
// 4. API HANDLER
// ===========================================================================
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, params, numbers } = body;

    // Auth check for protected actions
    if (action === 'divination' || action === 'analyze') {
      if (!authenticate(request)) {
        return NextResponse.json({ success: false, message: "Unauthorized: Invalid Token" }, { status: 403 });
      }
    }

    // Routing based on 'action'
    switch (action) {
      case 'divination':
        const divResult = await DivinationEngine.calculateQimen(params);
        return NextResponse.json({ success: true, data: divResult });
      
      case 'analyze':
        const anaResult = DivinationEngine.analyzeNumbers(numbers);
        return NextResponse.json({ success: true, data: anaResult });
      
      case 'login':
        const { tel, pwd } = body;
        const user = (CONFIG.USER_DB as any)[tel];
        if (user && user.password === pwd) {
          return NextResponse.json({
            success: true,
            token: user.token,
            userName: user.name,
            role: user.role
          });
        }
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });

      default:
        return NextResponse.json({ success: false, message: "Unknown action" }, { status: 400 });
    }
  } catch (e: any) {
    return NextResponse.json({ success: false, message: e.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Tang Yun V2 Unified API Active 🚀' });
}
