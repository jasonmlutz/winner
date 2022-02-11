const urlBase = "/api";
const token = document.querySelector("[name=csrf-token]").content;

export async function handleDelete(
  id,
  object,
  objects,
  family,
  navCallback,
  path
) {
  await fetch(`${urlBase}/${family}/${id}`, {
    method: "DELETE",
    headers: {
      "X-CSRF-TOKEN": token,
    },
  }).catch((error) => {
    window.alert(error);
    return;
  });

  // surveys don't need this step
  if (family === "questions" || family === "response_options") {
    objects.forEach(async (element) => {
      if (element.position > object.position) {
        await adjustObjectPosition(element.id, family, element.position - 1);
      }
    });
  }

  navCallback(path);
}

async function adjustObjectPosition(id, family, newPosition) {
  await fetch(`${urlBase}/${family}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": token,
    },
    body: JSON.stringify({
      position: newPosition,
    }),
  }).catch((error) => {
    window.alert(error);
    return;
  });
}

export async function handleMove(
  object,
  objects,
  family,
  navCallback,
  path,
  dir
) {
  let indexModifier;
  switch (dir) {
    case "up":
      indexModifier = -1;
      break;
    case "down":
      indexModifier = 1;
      break;
    default:
      indexModifier = 0;
      break;
  }

  await adjustObjectPosition(
    object.id,
    family,
    object.position + indexModifier
  );

  const adjacentObject = objects.find(
    (element) => element.position === object.position + indexModifier
  );

  await adjustObjectPosition(
    adjacentObject.id,
    family,
    adjacentObject.position - indexModifier
  );

  navCallback(path);
}

export async function handleEditSubmit(
  e,
  id,
  family,
  title,
  navCallback,
  path,
  stateCallback
) {
  e.preventDefault();
  if (title) {
    // db push
    await fetch(`${urlBase}/${family}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": token,
      },
      body: JSON.stringify({
        title: title,
      }),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    navCallback(path);
    stateCallback(false);
  } else {
    alert("please enter a title!");
  }
}
