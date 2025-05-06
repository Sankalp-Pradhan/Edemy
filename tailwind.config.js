export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'course-detail-heading-small ': ['26px', '36px'],
        "home-heading-small": ['36px', '44px'],
        'course-detail-heading-large': ['28px', '34px'],
        'home-Heading-large': ['48px', '56px'],
        'default': ['15px', '21px'],
      },
      gridTemplateColumns: {
        'auto': 'repeat(auto-fit, minmax(200px,1fr))'
      }
    },
  },
  plugins: [],
}