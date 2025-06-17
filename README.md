# Ryo Okada's Portfolio

A visually stunning personal portfolio website featuring an interactive cosmic network animation built with p5.js.

🌐 **Live Demo**: [https://ryok.github.io/portfolio/](https://ryok.github.io/portfolio/)

## ✨ Features

### Interactive Background Animation
- **Cosmic Network**: Dynamic particle system with interconnected nodes
- **Mouse Interaction**: Particles follow cursor movement with physics simulation
- **Click Effects**: Generate new particles on mouse click
- **Section Attractors**: Particles change colors based on page sections

### Modern Design
- **Glassmorphism**: Semi-transparent elements with backdrop blur effects
- **Smooth Animations**: Hover effects, transitions, and parallax scrolling
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Eye-friendly dark color scheme with vibrant accents

### Portfolio Sections
- **AI Hobbys**: Showcasing AI/ML creative projects with animated GIFs
- **Research Publications**: Academic papers from JSAI conferences
- **About Me**: Professional experience timeline
- **Skills & Certifications**: Technical expertise and qualifications
- **Contact**: Social media links and contact information

## 🚀 Technologies Used

- **p5.js**: Creative coding framework for the particle animation
- **jQuery**: DOM manipulation and event handling
- **SASS/SCSS**: Modular CSS with variables and mixins
- **HTML5 UP Template**: Base template (Dopetrope) for responsive design
- **FontAwesome**: Icon library for social links

## 📁 Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── assets/
│   ├── css/
│   │   ├── main.css       # Compiled CSS
│   │   └── cosmic-network.css  # Animation styles
│   ├── js/
│   │   ├── cosmic-network.js   # p5.js particle system
│   │   ├── portfolio-enhancements.js  # Interactive features
│   │   └── ...            # Other utility scripts
│   └── sass/              # SASS source files
├── images/                 # Portfolio images and GIFs
└── README.md              # This file
```

## 🛠️ Development

### Prerequisites
- Node.js and npm (for SASS compilation)
- A modern web browser

### Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ryok/portfolio.git
   cd portfolio
   ```

2. Install SASS (if not already installed):
   ```bash
   npm install -g sass
   ```

3. Compile SASS:
   ```bash
   sass assets/sass/main.scss assets/css/main.css
   ```

4. For development with auto-compilation:
   ```bash
   sass --watch assets/sass/main.scss:assets/css/main.css
   ```

5. Open `index.html` in your browser or use a local server.

### Customization

#### Particle Animation
Edit `assets/js/cosmic-network.js` to customize:
- `maxParticles`: Maximum number of particles
- `connectionDistance`: Distance for particle connections
- `sectionColors`: Colors for different page sections

#### Styling
- Main styles: `assets/sass/main.scss`
- Animation styles: `assets/css/cosmic-network.css`
- Color variables: `assets/sass/libs/_vars.scss`

## 📄 License

- Portfolio content: © Ryo Okada 2024
- HTML5 UP Template: CCA 3.0 license
- p5.js: LGPL-2.1 license

## 🤝 Acknowledgments

- [HTML5 UP](https://html5up.net/) for the Dopetrope template
- [p5.js](https://p5js.org/) for the creative coding framework
- Inspired by cosmic-network visualization

## 📧 Contact

For inquiries, please reach out through:
- GitHub: [@ryok](https://github.com/ryok)
- LinkedIn: [Ryo Okada](https://www.linkedin.com/in/ryookada-5298765a/)

---

Made with ❤️ and lots of particles