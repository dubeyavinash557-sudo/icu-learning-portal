export default function Stats() {
  return (
    <section className="bg-blue-700 text-white py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

        <div>
          <h2 className="text-4xl font-bold">10,000+</h2>
          <p>Students</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold">50+</h2>
          <p>Courses</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold">100+</h2>
          <p>PDF Notes</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold">95%</h2>
          <p>Success Rate</p>
        </div>

      </div>
    </section>
  );
}