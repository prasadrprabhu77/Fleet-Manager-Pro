// src/pages/About.jsx
export default function About() {
  return (
    <div className="min-h-screen p-8 bg-gray-100 text-gray-900">
      <div className="max-w-4xl mx-auto p-8 rounded-xl shadow-lg bg-white border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center">About Our Platform</h1>
        <p className="text-lg leading-relaxed mb-4">
          Our logistics management platform is designed to streamline and simplify the
          day-to-day operations of transportation and fleet management. The system
          efficiently stores and maintains comprehensive data for both drivers and vehicles,
          providing a centralized hub for all critical information.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          From driver profiles and trip logs to vehicle details and maintenance records, every
          piece of data is organized for easy access and real-time tracking. With user roles
          and permissions, the platform ensures secure and role-based access, allowing
          managers and admins to make informed decisions quickly.
        </p>
        <p className="text-lg leading-relaxed">
          Built with a focus on usability and efficiency, this solution helps businesses
          optimize operations, improve accountability, and enhance overall productivity
          in the logistics workflow.
        </p>
      </div>
    </div>
  );
}
