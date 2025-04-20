


// Play sound on card click
function playSound() {
  const audio = document.getElementById("click-sound");
  audio.play();
}

// Greeting based on time (used for old avatar if still present)
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();
if (greeting) {
  if (hour < 12) greeting.textContent = "Good morning!";
  else if (hour < 18) greeting.textContent = "Good afternoon!";
  else greeting.textContent = "Good evening!";
}

// Swipe detection (Tactile)
let startX;
document.addEventListener("touchstart", e => startX = e.touches[0].clientX);
document.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) alert("You swiped right!");
});

// Scroll animations with IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("fade-in");
  });
});
document.querySelectorAll("section").forEach(sec => observer.observe(sec));

// Dark mode toggle
document.getElementById("darkModeToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

// Navbar preview hover
const previewBox = document.getElementById("nav-preview");
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener("mouseover", () => {
    const img = link.getAttribute("data-img");
    previewBox.style.display = "block";
    previewBox.style.backgroundImage = `url(${img})`;
  });
  link.addEventListener("mouseout", () => {
    previewBox.style.display = "none";
  });
});

// 🌟 Interactive Floating Avatar Logic
const avatarEmoji = document.getElementById("avatar-emoji");
const avatarMessage = document.getElementById("avatar-message");
let avatarClicks = 0;

function avatarInteract() {
  const messages = [
    "Hey there! Want to see my projects? Click Projects! ",
    "Click on moon to see in night mode!",
    "Click again if you're curious!",
    "You're awesome for visiting my portfolio!",
  ];
  const emojiList = ["💡", "🎨", "🧭", "🚀", "💬"];

  avatarEmoji.textContent = emojiList[avatarClicks % emojiList.length];
  avatarMessage.textContent = messages[avatarClicks % messages.length];

  const utterance = new SpeechSynthesisUtterance(messages[avatarClicks % messages.length]);
  utterance.pitch = 1.2;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);

  avatarClicks++;
}

// Initial mood on load
if (avatarEmoji && avatarMessage) {
  if (hour < 12) {
    avatarEmoji.textContent = "🌞";
    avatarMessage.textContent = "Good morning! Ready to explore?";
  } else if (hour < 18) {
    avatarEmoji.textContent = "😎";
    avatarMessage.textContent = "Good afternoon! Check out my projects!";
  } else {
    avatarEmoji.textContent = "🌙";
    avatarMessage.textContent = "Working late? Let me help you!";
  }

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 300 && scrollY < 800) {
      avatarEmoji.textContent = "👀";
      avatarMessage.textContent = "Scroll down for cool stuff!";
    } else if (scrollY >= 800) {
      avatarEmoji.textContent = "💬";
      avatarMessage.textContent = "Got feedback? Leave a testimonial!";
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const darkBtn = document.getElementById("darkModeToggle");

  // Check saved theme from localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
    if (darkBtn) darkBtn.textContent = "☀️";
  }

  if (darkBtn) {
    darkBtn.onclick = () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
      darkBtn.textContent = isDark ? "☀️" : "🌙";
    };
  }
});
// Function to unfold/fold project content when the ribbon is clicked
function toggleProject(projectNumber) {
  const projectCard = document.querySelector(`.project-card:nth-of-type(${projectNumber})`);
  const ribbon = projectCard.querySelector('.ribbon');

  projectCard.classList.toggle('expanded');

  // Toggle the ribbon text based on the current state
  if (projectCard.classList.contains('expanded')) {
    ribbon.textContent = "Fold";  // Change to Fold when expanded
    ribbon.setAttribute("data-status", "fold");
  } else {
    ribbon.textContent = "Unfold";  // Change to Unfold when folded
    ribbon.setAttribute("data-status", "unfold");
  }
}



function revealContactCard() {
  const container = document.getElementById('contactContainer');
  container.classList.toggle('active');
}




// Swipe gesture support
let start = 0;
let endX = 0;

document.addEventListener('touchstart', (e) => {
  start = e.touches[0].clientX;
}, false);

document.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}, false);

function handleSwipe() {
  const container = document.getElementById('contactContainer');
  const threshold = 50; // Minimum swipe distance in px

  if (start - endX > threshold) {
    // Swiped left
    container.classList.add('active');
  } else if (endX - start > threshold) {
    // Swiped right
    container.classList.remove('active');
  }
}




window.addEventListener('load', function () {
  var audio = document.getElementById('persistentAudio');
  var audioToggle = document.getElementById('audioToggle');

  // Check if the audio is playing (using localStorage to remember)
  if (!localStorage.getItem('audioPlaying')) {
    // If audio is not already playing, start it and set it to loop
    audio.play();
    localStorage.setItem('audioPlaying', 'true');
  } else {
    // If audio is already playing, just loop it
    audio.loop = true;
    audio.play();
  }

  // Keep the audio in loop even when switching pages
  audio.loop = true;

  // Toggle the audio when the button is clicked
  audioToggle.addEventListener('click', function () {
    if (audio.paused) {
      audio.play();
      localStorage.setItem('audioPlaying', 'true'); // Save audio state as playing
      audioToggle.textContent = '🔊'; // Change button text to "Audio On"
    } else {
      audio.pause();
      localStorage.setItem('audioPlaying', 'false'); // Save audio state as paused
      audioToggle.textContent = '🔈'; // Change button text to "Audio Off"
    }
  });
});



  // Wait for the page to load
  window.addEventListener('DOMContentLoaded', () => {
  // Check if the user has been greeted before by looking in sessionStorage
  if (!sessionStorage.getItem('greeted')) {
  const hour = new Date().getHours();
  let greeting = "Hello";

  // Determine the greeting based on the time of day
  if (hour < 12) {
  greeting = "Good morning";
} else if (hour < 17) {
  greeting = "Good afternoon";
} else {
  greeting = "Good evening";
}

  // Create the message and speak it
  const message = `${greeting}, I'm Rohit. Welcome to my portfolio website.`;
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);

  // Set the flag in sessionStorage to ensure the greeting only happens once during the session
  sessionStorage.setItem('greeted', 'true');
}
});
