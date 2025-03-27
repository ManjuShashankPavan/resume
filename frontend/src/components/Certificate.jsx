

const Certificate = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">Course Completion Certificate</h1>
      <p className="text-gray-600 mt-2 text-center">
        Earn a verifiable certificate upon successfully completing your courses.
      </p>

      
      {/* Certificate Box */}
      <div className="mt-16 bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center w-full max-w-md">
        <img src="/CertificateIcon.jpg" alt="Certificate Icon" className="w-16 h-16" />
        <h2 className="text-lg font-semibold mt-4">Get Your Certificate</h2>
        <p className="text-gray-600 mt-2">
          Download and share your certificate after completing the course.
        </p>
      </div>
    </div>
  );
};

export default Certificate;
