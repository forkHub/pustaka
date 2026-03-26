var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { supabase } from "./supabase";
const email = document.getElementById("email");
const password = document.getElementById("password");
document.getElementById("btnLogin").onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });
    if (error)
        return alert(error.message);
    window.location.href = "index.html";
});
document.getElementById("btnRegister").onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield supabase.auth.signUp({
        email: email.value,
        password: password.value,
    });
    if (error)
        return alert(error.message);
    alert("Check your email for verification!");
});
