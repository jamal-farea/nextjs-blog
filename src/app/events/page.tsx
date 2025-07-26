import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { getUpcomingEvents, getPastEvents } from "@/lib/events-api";
import { Event } from "@/interfaces/event";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  const EventCard = ({ event }: { event: Event }) => (
    <div key={event.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <CoverImage title={event.title} src={event.coverImage} slug={event.slug} />
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            event.type === 'conference' ? 'bg-blue-100 text-blue-800' :
            event.type === 'workshop' ? 'bg-green-100 text-green-800' :
            event.type === 'meetup' ? 'bg-purple-100 text-purple-800' :
            event.type === 'webinar' ? 'bg-orange-100 text-orange-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {event.type}
          </span>
          {event.isUpcoming && (
            <span className="ml-2 px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
              Upcoming
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <DateFormatter dateString={event.date} />
          {event.location && (
            <span className="ml-4">📍 {event.location}</span>
          )}
        </div>
        {event.registrationUrl && event.isUpcoming && (
          <a 
            href={event.registrationUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Register Now
          </a>
        )}
      </div>
    </div>
  );

  return (
    <main>
      <Container>
        <Header />
        <div className="mb-32">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Events
          </h1>
          <p className="text-lg leading-relaxed mb-16">
            Join us at our upcoming events and check out what we've been up to.
          </p>
          
          {upcomingEvents.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map((event: Event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </section>
          )}
          
          {pastEvents.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Past Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pastEvents.map((event: Event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
            </section>
          )}
          
          {upcomingEvents.length === 0 && pastEvents.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No events scheduled yet. Check back soon!</p>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
} 