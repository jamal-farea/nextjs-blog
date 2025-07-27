import { NextRequest, NextResponse } from 'next/server';
import { getTeamMembersByLanguage } from '@/lib/team-api';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const language = searchParams.get('language') || 'en';
  
  try {
    const teamMembers = getTeamMembersByLanguage(language);
    return NextResponse.json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
} 