import { ref, reactive } from "vue";

interface IMovingElement {
  x: number;
  y: number;
  set: (a: HTMLElement | null) => void;
};

interface IShifts {
  shiftX: number;
  shiftY: number;
  set: (a: number, b: number, c: HTMLElement | null) => void;
};

export const useDragNDrop = (moveTask) => {
  const currentDroppable = ref<HTMLElement | Element | null>(null);
  const placeholder = ref<HTMLElement | null>(null);
  const isDraggingStarted = ref(false);
  const movingElement = ref<HTMLElement | null>(null);
  const elementWidth = ref<number>();
  const initialMovingElementPageXY = reactive<IMovingElement>({
    x: 0,
    y: 0,
    set: (movingElement) => {
      const rect = movingElement!.getBoundingClientRect();
      initialMovingElementPageXY.x = rect.x + window.scrollX;
      initialMovingElementPageXY.y = rect.y + window.scrollY;
    },
  });
  const shifts = reactive<IShifts>({
    shiftX: 0,
    shiftY: 0,
    set: (clientX, clientY, movingElement) => {
      shifts.shiftX = clientX - movingElement!.getBoundingClientRect().left;
      shifts.shiftY = clientY - movingElement!.getBoundingClientRect().top;
    },
  });

  const moveAt = (element, pageX, pageY) => {
    element.style.transform = `translate(${
      pageX - initialMovingElementPageXY.x - shifts.shiftX
    }px, ${
      pageY - initialMovingElementPageXY.y - shifts.shiftY
    }px)`;
  };

  const getElementCoordinates = (node, searchCoordsBy) => {
    const rect = node.getBoundingClientRect();
    return {
      top:
        searchCoordsBy === "by-center"
          ? rect.top + rect.height / 2
          : rect.top + 10,
      left: rect.left + rect.width / 2,
    };
  };

  const getElementBelow = (movingElement, searchCoordsBy) => {
    const movingElementCenter = getElementCoordinates(
      movingElement,
      searchCoordsBy
    );
    movingElement.hidden = true;
    let elementBelow = document.elementFromPoint(
      movingElementCenter.left,
      movingElementCenter.top
    );
    movingElement.hidden = false;
    return elementBelow;
  };
  
  const isAbove = (nodeA, nodeB) => {
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();
  
    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
  };

  const createPlaceholder = () => {
    placeholder.value = document.createElement("div");
    placeholder.value.classList.add("task__placeholder");
    
    placeholder.value.style.height = `${movingElement.value!.getBoundingClientRect().height}px`;
    movingElement.value!.style.width = `316px`;
    movingElement.value!.parentNode!.insertBefore(placeholder.value, movingElement.value!);
  };

  const onMouseMove = (event) => {
    if (!isDraggingStarted.value) {
      isDraggingStarted.value = true;
      createPlaceholder();
      Object.assign(movingElement.value!.style, {
        position: "absolute",
        zIndex: 1000,
        left: `${initialMovingElementPageXY.x}px`,
        top: `${initialMovingElementPageXY.y}px`,
      });
    }
    moveAt(movingElement.value, event.pageX, event.pageY);

    let elementBelow = getElementBelow(movingElement.value, "by-center");
    if (!elementBelow) return;
    let droppableBelow = elementBelow.closest(".task");
    if (currentDroppable.value != droppableBelow) {
      currentDroppable.value = droppableBelow;
      if (currentDroppable.value) {
        if (
          !isAbove(movingElement.value, currentDroppable.value) ||
          currentDroppable.value.classList.contains("task_empty")
        ) {
          currentDroppable.value!.parentNode!.insertBefore(
            placeholder.value!,
            currentDroppable.value
          );
        } else {
          currentDroppable.value!.parentNode!.insertBefore(
            placeholder.value!,
            currentDroppable.value.nextElementSibling
          );
        }
      }
    }
  };

  const setMovingElement = (event: Event & { target: HTMLElement }) => {
    elementWidth.value = event.target.getBoundingClientRect().width;
    movingElement.value = event.target;
  };

  const onMouseUp = () => {
    if (!isDraggingStarted.value) {
      document.removeEventListener("mousemove", onMouseMove);
      movingElement.value!.onmouseup = null;
      return;
    }

    moveTask({
      targetColumnIndex: placeholder.value!.closest(".column")?.getAttribute('data-index'),
      prevTaskId: placeholder.value!.previousElementSibling?.getAttribute('data-id'),
    });

    placeholder.value!.parentNode!.insertBefore(movingElement.value!, placeholder.value);
    Object.assign(movingElement.value!.style, {
      position: "relative",
      left: "auto",
      top: "auto",
      zIndex: "auto",
      transform: "none",
      width: "auto",
    });
    document.removeEventListener("mousemove", onMouseMove);

    isDraggingStarted.value = false;
    placeholder.value && placeholder.value!.parentNode!.removeChild(placeholder.value);
    movingElement.value!.onmouseup = null;
    movingElement.value = null;
  };

  const onMouseDown = (event) => {
    setMovingElement(event);
    shifts.set(event.clientX, event.clientY, movingElement.value);
    initialMovingElementPageXY.set(movingElement.value);
    document.addEventListener("mousemove", onMouseMove);
    movingElement.value!.onmouseup = onMouseUp;
  };

  return { onMouseDown };
};