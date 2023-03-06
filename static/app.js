Array.from(document.forms).forEach((form) =>
  form.addEventListener("submit", (e) => e.preventDefault())
);

// constants HTML Elements
const copy_btn = document.getElementById("copy");
const logout_btn = document.getElementById("logout");
const new_room_btn = document.getElementById("new_room");
const with_room_section = document.getElementById("with_room");
const no_room_section = document.getElementById("no_room");
const old_room_form = document.getElementById("old_room");
const chat_form = document.getElementById("chat_form");
const chats_list = document.getElementById("chats");

// main variables
const socket = io.connect();
let room = "";

// events
new_room_btn.addEventListener("click", (e) => {
  room = btoa(Math.random());

  start();
});
logout_btn.addEventListener("click", (_) => {
  socket.emit("leave room", room);
  with_room_section.classList.add("d-none");
  no_room_section.classList.remove("d-none");
});

old_room_form.addEventListener("submit", (e) => {
  room = old_room_form.room.value;

  if (room) start();
});

copy_btn.addEventListener("click", (e) => {
  navigator.clipboard.writeText(room).then(
    function () {
      alert(`تم نسخ {{ ${room} }} بنجاح`);
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
});

chat_form.addEventListener("submit", () => {
  const msg = chat_form.msg.value.trim();

  if (msg) {
    const data = { msg, id: socket.id, room };
    socket.emit("client => server", data);

    chat_form.msg.value = "";
    chat_form.msg.focus();
  }
});

// functions
function start() {
  socket.emit("join room", room);
  with_room_section.classList.remove("d-none");
  no_room_section.classList.add("d-none");
  chats_list.innerHTML = "";
  chat_form.msg.focus();
}

// handels
socket.on("client <= server", (data) => {
  const li = document.createElement("li");
  li.innerHTML = data.msg;

  if (data.id == socket.id) li.classList.add("me");

  chats_list.appendChild(li);
  li.scrollIntoView();
});
