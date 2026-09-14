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

const problem =
    document.getElementById("businessProblem");

const goal =
    document.getElementById("businessGoal");

const problemCount =
    document.getElementById("problemCount");

const goalCount =
    document.getElementById("goalCount");


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

        if (
            field.value.trim() !== ""
        ) {
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
   CHARACTER COUNTERS
================================ */

problem.addEventListener(
    "input",
    function() {

        problemCount.textContent =
            problem.value.length;

    }
);


goal.addEventListener(
    "input",
    function() {

        goalCount.textContent =
            goal.value.length;

    }
);


/* ================================
   SUBMIT
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
            "Analyzing...";


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
           SEND TO MAKE.COM
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
               SUCCESS
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


            /* ----------------------------
               ERROR MESSAGE
            ---------------------------- */

            alert(
                "Something went wrong while submitting your business information. Please try again."
            );


            /* ----------------------------
               ENABLE BUTTON AGAIN
            ---------------------------- */

            submitButton.disabled =
                false;

            submitButton.innerHTML =
                "Analyze My Business";

        }

    }
);


/* ================================
   SUBMIT ANOTHER RESPONSE
================================ */

anotherButton.addEventListener(
    "click",
    function() {

        /* Reset form */

        form.reset();


        /* Reset counters */

        problemCount.textContent =
            "0";

        goalCount.textContent =
            "0";


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


        /* Reset button */

        submitButton.disabled =
            false;

        submitButton.innerHTML =
            "Analyze My Business";


        /* Scroll back to form */

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
