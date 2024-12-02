import Group from './Group.jsx'; // Ensure this file path is correct
import jm from './images/jm.jpg'
import matt from './images/matt.jpg'
import lloy from './images/loyd.jpg'

function App() {
  const members = [
    {
      name: 'John Michael Pague',
      role: 'Marketing Specialist',
      bio: 'Expert in crafting effective marketing strategies.',
      image: jm, // Corrected image path
    },
    {
      name: 'Matt Saquilayan',
      role: 'Team Leader',
      bio: 'Passionate about real estate and innovative technologies.',
      image: matt, // Corrected image path
    },
    {
      name: 'Loyd Monteiro',
      role: 'Developer',
      bio: 'Enthusiastic coder with a knack for problem-solving.',
      image: lloy, // Corrected image path
    },
  ];

  return (
    <div>
      <Group members={members} />
    </div>
  );
}

export default App;