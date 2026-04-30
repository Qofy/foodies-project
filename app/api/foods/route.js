import { getFoodListings } from '@/lib/marketplace';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const foods = await getFoodListings();
    return NextResponse.json(foods);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch foods' },
      { status: 500 }
    );
  }
}
