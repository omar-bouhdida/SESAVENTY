import React from 'react';
import './HomePage.css';
import img1 from '../../assets/images/img1.jpeg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import img4 from '../../assets/images/img4.jpeg';
import logo1 from '../../assets/images/logo1.jpg';
import logo2 from '../../assets/images/logo2.jpg';
import logo4 from '../../assets/images/logo4.jpg';

const HomePage = () => {
  const logos = [
    {
      id: 1,
      alt: "Spotify logo green circle with white sound wave icon",
      src: "https://storage.googleapis.com/a1aa/image/d7a3d8f6-8c26-49c7-be6d-ef1320815104.jpg"
    },
    {
      id: 2,
      alt: "Netflix logo red letter N on white background inside circle",
      src: "https://storage.googleapis.com/a1aa/image/fe538544-48a5-4a1d-ed6c-bd334910408a.jpg"
    },
    {
      id: 3,
      alt: "Shazam logo blue circle with white stylized S icon",
      src: "https://storage.googleapis.com/a1aa/image/90e2a560-fe72-4a45-360b-c3ea432ccd90.jpg"
    },
    {
      id: 4,
      alt: "Notion logo black and white cube with letter N",
      src: "https://storage.googleapis.com/a1aa/image/b2dd4d04-182b-42d1-be96-39e46f66937e.jpg"
    },
    {
      id: 5,
      alt: "Asana logo pink circle with three white dots arranged in triangle",
      src: "https://storage.googleapis.com/a1aa/image/4713a843-5879-4736-1e05-d0df0ec8dda5.jpg"
    },
    {
      id: 6,
      alt: "Mailchimp logo yellow circle with black chimp face wearing a hat",
      src: "https://storage.googleapis.com/a1aa/image/e331a241-6725-48fe-f350-25910be25578.jpg"
    },
    {
      id: 7,
      alt: "YouTube Music logo red circle with white play button and music note",
      src: "https://storage.googleapis.com/a1aa/image/14b1bc26-3308-4523-10a4-1bc4ae760b83.jpg"
    }
  ];

  return (
    <div className="home-container">
      <main className="home-main">
        <h1>
          Where Campus<br />
          Comes to Life!
        </h1>
        <p>Powered by the Ultimate Students</p>
        <button className="cta-btn">Checkout Our Events</button>
      </main>

      <section className="image-gallery">
        <img src={img1} alt="Group of students posing outdoors" />
        <img src={img2} alt="Group of students on stage" />
        <img src={img3} alt="Students with flags" />
        <img src={img4} alt="Female student singing" />
      </section>

      <section className="stats-section">
        <h1 className="stats-title">
          Let the numbers
          <br />
          speak
        </h1>

        <div className="stats-cards">
          {/* Card 1 */}
          <div className="stats-card">
            <div className="stats-images">
              <img
                src="https://storage.googleapis.com/a1aa/image/5aadb71f-58ca-47ec-b678-989a1a24572b.jpg"
                alt="Young man with backpack outdoors"
              />
              <img
                src="https://storage.googleapis.com/a1aa/image/a42b389b-b261-4acb-4467-38e1af42b9ed.jpg"
                alt="Group of five smiling young people"
              />
              <img
                src="https://storage.googleapis.com/a1aa/image/4e3e3f01-dd43-444a-b803-0d98ff085351.jpg"
                alt="Large group of diverse young adults outdoors"
              />
            </div>
            <p className="stats-count">+200 Member</p>
          </div>

          {/* Card 2 */}
          <div className="stats-card">
            <div className="stats-images">
              <img src={logo2} alt="Ses'Over club logo" />
              <img src={logo1} alt="Engineers Spark Sesame club logo" />
              <img src={logo4} alt="IEEE club logo" />
            </div>
            <p className="stats-count">+12 Club</p>
          </div>

          {/* Card 3 */}
          <div className="stats-card">
            <div className="stats-images">
              <img
                src="https://storage.googleapis.com/a1aa/image/db00c1ce-7437-464e-bc53-e609ab6380d9.jpg"
                alt="Event with purple lighting"
              />
              <img
                src="https://storage.googleapis.com/a1aa/image/7033f719-6569-40c3-bfc7-06001126c6c6.jpg"
                alt="People standing in lobby"
              />
              <img
                src="https://storage.googleapis.com/a1aa/image/d0a22cbd-c1f2-41bd-7cc2-ebe086e2ba71.jpg"
                alt="People on stage"
              />
            </div>
            <p className="stats-count">+100 Event</p>
          </div>
        </div>
      </section>

      <section className="customers-section">
        <h2 className="customers-title">Our Customers</h2>
        <p className="customers-description">
          As a user, it is important to have a positive experience when using a website or app.
        </p>
        <div className="slider-container">
          <div className="slider-track">
            {logos.map(logo => (
              <div key={logo.id} className="logo-wrapper">
                <img
                  alt={logo.alt}
                  className="logo-img"
                  loading="lazy"
                  src={logo.src}
                />
              </div>
            ))}
            {logos.map(logo => (
              <div key={`duplicate-${logo.id}`} className="logo-wrapper">
                <img
                  alt={logo.alt}
                  className="logo-img"
                  loading="lazy"
                  src={logo.src}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;