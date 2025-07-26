import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getAllTeamMembers } from "@/lib/team-api";
import { TeamMember } from "@/interfaces/team-member";
import Avatar from "@/app/_components/avatar";

export default function TeamPage() {
  const teamMembers = getAllTeamMembers();

  return (
    <main>
      <Container>
        <Header />
        <div className="mb-32">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Our Team
          </h1>
          <p className="text-lg leading-relaxed mb-16">
            Meet the amazing people behind our success.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member: TeamMember) => (
              <div key={member.slug} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <Avatar name={member.name} picture={member.picture} />
                  <h3 className="text-xl font-bold mt-4 mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <p className="text-gray-700 mb-4">{member.bio}</p>
                  
                  <div className="flex space-x-4">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800">
                        Email
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        LinkedIn
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        Twitter
                      </a>
                    )}
                    {member.github && (
                      <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
} 