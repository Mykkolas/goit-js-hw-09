const formData = {
    email: "",
    message: ""
};

const form = document.querySelector(".feedback-form");
const localStorageKey = "feedback-form-state";

const getFormData = () => {
    try {
        const localData = localStorage.getItem(localStorageKey);
        if (localData) {
            const parsedData = JSON.parse(localData);
            formData.email = parsedData.email || "";
            formData.message = parsedData.message || "";

            form.elements.email.value = formData.email;
            form.elements.message.value = formData.message;
        }
    } catch (err) {
        console.error("Error reading from localStorage:", err);
    }
};
getFormData();

const handleInput = (e) => {
    if (e.target.name) {
        const { name, value } = e.target;
        formData[name] = value.trim();
        try {
            localStorage.setItem(localStorageKey, JSON.stringify(formData));
        } catch (err) {
            console.error("Error saving to localStorage:", err);
        }
    }
};


const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
        alert("Please fill in all fields");
        return;
    }


    console.log("Submitted data:", formData);

    localStorage.removeItem(localStorageKey);
    formData.email = "";
    formData.message = "";
    form.elements.email.value = "";
    form.elements.message.value = "";
    form.reset();
};

form.addEventListener("input", handleInput);
form.addEventListener("submit", handleSubmit);
