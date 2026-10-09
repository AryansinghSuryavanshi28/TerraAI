
const $ = (id) => document.getElementById(id);

const form = $("mission-form-element");
const generateBtn = $("generate-btn");
const missionSection = $("mission-section");
const timerSection = $("timer-section");

let currentMission = null;
let remainingSeconds = 0;
let timerInterval = null;
let timerRunning = false;
let sessionStartedAt = null;
let completedThisMission = false;

const sampleMissions = {
  "nature exploration": [
    "Discover your tiny corner of nature",
    [
      "Find three different leaf shapes.",
      "Notice one pattern in the clouds, trees, or ground.",
      "Stand still for two minutes and listen to nature."
    ]
  ],
  walking: [
    "Take the scenic route",
    [
      "Choose a safe walking route.",
      "Walk at a comfortable pace and notice your surroundings.",
      "Find one interesting detail you usually overlook."
    ]
  ],
  birdwatching: [
    "Meet your neighborhood birds",
    [
      "Find a safe place to observe birds from a distance.",
      "Listen for two different bird calls.",
      "Notice how a bird moves without disturbing it."
    ]
  ],
  gardening: [
    "Become a plant detective",
    [
      "Observe a plant you can access safely.",
      "Look at its leaves, stem, and growing conditions.",
      "Check whether it needs water before watering it."
    ]
  ],
  "nature photography": [
    "Capture nature's little details",
    [
      "Find an interesting natural texture or pattern.",
      "Take a photo of something you normally walk past.",
      "Try a close-up and a wider composition."
    ]
  ],
  mindfulness: [
    "A little outdoor reset",
    [
      "Sit or stand somewhere safe and comfortable.",
      "Notice five things you can see and three things you can hear.",
      "Take a few slow, comfortable breaths."
    ]
  ]
};

function getDuration() {
  return Number(
    document.querySelector('input[name="duration"]:checked').value
  );
}

function fallbackMission(activity, duration, mood) {
  const template = sampleMissions[activity] || sampleMissions["nature exploration"];

  return {
    title: template[0],
    description: `A ${duration}-minute outdoor adventure for when you're feeling ${mood}.`,
    steps: template[1],
    duration
  };
}

function cleanMission(data, duration) {
  if (
    !data ||
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    !Array.isArray(data.steps) ||
    data.steps.length < 1
  ) {
    throw new Error("The AI returned an invalid mission.");
  }

  return {
    title: data.title.slice(0, 100),
    description: data.description.slice(0, 350),
    steps: data.steps
      .filter(step => typeof step === "string")
      .slice(0, 5)
      .map(step => step.slice(0, 220)),
    duration
  };
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  clearInterval(timerInterval);
  timerRunning = false;
  completedThisMission = false;
  currentMission = null;

  const mood = $("mood").value;
  const activity = $("activity").value;
  const duration = getDuration();

  generateBtn.disabled = true;
  generateBtn.textContent = "✨ Growing your adventure...";
  missionSection.hidden = true;
  timerSection.hidden = true;

  let mission;

  try {
    const response = await fetch("/api/mission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood, activity, duration })
    });

    if (!response.ok) {
      throw new Error("Local AI server unavailable");
    }

    const data = await response.json();
    mission = cleanMission(data, duration);
    $("mission-description").dataset.source = "ai";
  } catch (error) {
    mission = fallbackMission(activity, duration, mood);
    $("mission-description").dataset.source = "sample";
  }

  currentMission = mission;
  renderMission(mission);

  generateBtn.disabled = false;
  generateBtn.textContent = "✨ Generate my mission";
  missionSection.hidden = false;
  missionSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

function renderMission(mission) {
  $("mission-title").textContent = mission.title;
  $("mission-description").textContent = mission.description;
  $("mission-time").textContent = `⏱ ${mission.duration} minutes`;

  const list = $("mission-steps");
  list.replaceChildren();

  mission.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    list.appendChild(item);
  });

  $("start-btn").textContent = "Start outdoor timer →";
}

$("start-btn").addEventListener("click", () => {
  if (!currentMission) return;

  clearInterval(timerInterval);
  remainingSeconds = currentMission.duration * 60;
  sessionStartedAt = Date.now();
  completedThisMission = false;

  missionSection.hidden = true;
  timerSection.hidden = false;
  timerRunning = true;

  $("pause-btn").textContent = "Pause timer";
  updateTimerDisplay();
  timerSection.scrollIntoView({ behavior: "smooth", block: "center" });

  timerInterval = setInterval(() => {
    if (!timerRunning) return;

    remainingSeconds--;
    updateTimerDisplay();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      finishMission(true);
    }
  }, 1000);
});

function updateTimerDisplay() {
  const minutes = Math.floor(Math.max(0, remainingSeconds) / 60);
  const seconds = Math.max(0, remainingSeconds) % 60;

  $("timer").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

$("pause-btn").addEventListener("click", () => {
  if (remainingSeconds <= 0) return;

  timerRunning = !timerRunning;
  $("pause-btn").textContent = timerRunning ? "Pause timer" : "Resume timer";
});

$("finish-btn").addEventListener("click", () => {
  if (remainingSeconds > 0) {
    const proceed = confirm("Finish this mission now?");
    if (!proceed) return;
  }

  clearInterval(timerInterval);
  timerRunning = false;
  finishMission(false);
});

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem("terraProgress")) || {};
    return {
      points: Math.max(0, Number(saved.points) || 0),
      completed: Math.max(0, Number(saved.completed) || 0),
      minutes: Math.max(0, Number(saved.minutes) || 0)
    };
  } catch {
    return { points: 0, completed: 0, minutes: 0 };
  }
}

function saveProgress(progress) {
  localStorage.setItem("terraProgress", JSON.stringify(progress));
}

function renderProgress() {
  const progress = loadProgress();
  $("points").textContent = progress.points;
  $("completed").textContent = progress.completed;
  $("minutes").textContent = progress.minutes;
}

function finishMission(timerCompleted) {
  if (!currentMission || completedThisMission) return;

  completedThisMission = true;
  clearInterval(timerInterval);

  // Count the actual elapsed timer time, rounded down to whole minutes.
  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - sessionStartedAt) / 1000)
  );
  const minutesOutside = Math.min(
    currentMission.duration,
    Math.floor(elapsedSeconds / 60)
  );

  const progress = loadProgress();
  progress.completed += 1;
  progress.points += 50;
  progress.minutes += minutesOutside;
  saveProgress(progress);
  renderProgress();

  $("timer").textContent = timerCompleted ? "Mission complete! 🌿" : "Well done! 🌱";
  $("pause-btn").hidden = true;
  $("finish-btn").textContent = "Create another mission";

  $("finish-btn").onclick = () => {
    $("pause-btn").hidden = false;
    $("finish-btn").textContent = "Finish mission";
    $("finish-btn").onclick = null;
    timerSection.hidden = true;
    missionSection.hidden = true;
    $("mission-form").scrollIntoView({ behavior: "smooth" });
  };
}

renderProgress();
