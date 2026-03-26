import { supabase } from "./supabase";

const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;

document.getElementById("btnLogin")!.onclick = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) return alert(error.message);

  window.location.href = "index.html";
};

document.getElementById("btnRegister")!.onclick = async () => {
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });

  if (error) return alert(error.message);

  alert("Check your email for verification!");
};