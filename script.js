const form = document.getElementById("businessForm");

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");

const submitButton =
    document.getElementById("submitButton");

const successScreen =
    document.getElementById("successScreen");

const anotherButton =
    document.getElementById("anotherButton");

const businessIdea =
    document.getElementById("businessIdea");

const ideaCount =
    document.getElementById("ideaCount");


/* ================================
   MAKE.COM WEBHOOK
================================ */

const webhookURL =
    "https://hook.eu1.make.com/xrhinbd6kvzwggmkw8982wrabac63ws2";


/* ================================
   FORM FIELDS
================================ */

const fields = form.querySelectorAll(
    "input, select, textarea"
);


/* ================================
   PROGRESS
================================ */

function updateProgress() {

    let completed = 0;

    fields.forEach(function(field) {

        if (field.value.trim() !== "") {
            completed++;
        }

    });

    const percentage = Math.round(
        (completed / fields.length) * 100
    );

    progressBar.style.width =
        percentage + "%";

    progressText.textContent =
        percentage + "%";

}


/* Listen for changes */

fields.forEach(function(field) {

    field.addEventListener(
        "input",
        updateProgress
    );

    field.addEventListener(
        "change",
        updateProgress
    );

});


/* ================================
   CHARACTER COUNTER
================================ */

if (businessIdea && ideaCount) {

    businessIdea.addEventListener(
        "input",
        function() {

            ideaCount.textContent =
                businessIdea.value.length;

        }
    );

}


/* ================================
   SUBMIT FORM
================================ */

form.addEventListener(
    "submit",
    async function(event) {

        event.preventDefault();


        /* ----------------------------
           VALIDATE FORM
        ---------------------------- */

        if (!form.checkValidity()) {

            form.reportValidity();

            return;

        }


        /* ----------------------------
           DISABLE BUTTON
        ---------------------------- */

        submitButton.disabled = true;

        submitButton.innerHTML =
            "Analyzing Your Startup...";


        /* ----------------------------
           COLLECT FORM DATA
        ---------------------------- */

        const formData =
            new FormData(form);

        const data = {};


        formData.forEach(
            function(value, key) {

                data[key] = value;

            }
        );


        /* ----------------------------
           SEND DATA TO MAKE.COM
        ---------------------------- */

        try {

            const response = await fetch(
                webhookURL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)
                }
            );


            /* ----------------------------
               CHECK RESPONSE
            ---------------------------- */

            if (!response.ok) {

                throw new Error(
                    "Make.com webhook request failed"
                );

            }


            /* ----------------------------
               SHOW SUCCESS SCREEN
            ---------------------------- */

            form.style.display =
                "none";

            successScreen.classList.add(
                "show"
            );

            successScreen.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        } catch (error) {

            console.error(
                "Webhook Error:",
                error
            );


            alert(
                "Something went wrong while submitting your startup information. Please try again."
            );


            /* ----------------------------
               ENABLE BUTTON AGAIN
            ---------------------------- */

            submitButton.disabled =
                false;

            submitButton.innerHTML =
                "Get My Startup Advice";

        }

    }
);


/* ================================
   START NEW ASSESSMENT
================================ */

anotherButton.addEventListener(
    "click",
    function() {

        /* Reset form */

        form.reset();


        /* Reset character counter */

        if (ideaCount) {

            ideaCount.textContent =
                "0";

        }


        /* Reset progress */

        progressBar.style.width =
            "0%";

        progressText.textContent =
            "0%";


        /* Hide success screen */

        successScreen.classList.remove(
            "show"
        );


        /* Show form */

        form.style.display =
            "block";


        /* Reset submit button */

        submitButton.disabled =
            false;

        submitButton.innerHTML =
            "Get My Startup Advice";


        /* Scroll to form */

        form.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);


/* ================================
   INITIAL STATE
================================ */

updateProgress();
