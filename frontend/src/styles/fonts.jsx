// src/fonts.jsx
import "@fontsource/poppins"; // Defaults to weight 400

const Fonts = () => {
  return (
    <style jsx global>{`
      * {
        font-family: 'Poppins', sans-serif;
      }
    `}</style>
  );
};

export default Fonts;
