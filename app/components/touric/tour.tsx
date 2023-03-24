import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import invariant from "tiny-invariant";

type Tour = {
  id: string;
  completed?: Date | null;
};
type ToursState = {
  tours: Tour[];
  completed?: Date | null;
  complete: (id: string) => void;
  uncomplete: (id: string) => void;
  open: (id?: string) => void;
  completeMany: (ids?: string[] | "all") => void;
  finish: () => void;
  reopen: () => void;
  find: (id: string) => Tour | undefined;
  findMany: (ids: string[] | "all") => Tour[];
  add: (tour: Tour) => void;
  update: (id: string, tour: Omit<Tour, "id">) => void;
  addMany: (tours: Tour[]) => void;
  delete: (id: string) => void;
  deleteMany: (ids: string[] | "all") => void;
  reset: () => void;
};
const useTours = create<ToursState>()(
  devtools(
    persist(
      (set, get) => ({
        tours: [],
        completed: undefined,
        complete: (id) =>
          set((state) => ({
            tours: state.tours.map((t) =>
              t.id === id
                ? {
                    ...t,
                    completed: new Date(),
                  }
                : t
            ),
          })),
        uncomplete(id) {
          set((state) => ({
            tours: state.tours.map((t) =>
              t.id === id
                ? {
                    ...t,
                    completed: null,
                  }
                : t
            ),
          }));
        },
        open: (id) => {
          if (typeof id === "undefined") return get().reopen();
          return set((state) => ({
            tours: state.tours.map((t) =>
              t.id === id
                ? {
                    ...t,
                    completed: null,
                  }
                : t
            ),
          }));
        },
        completeMany: (ids) => {
          if (!ids)
            throw new Error(
              "You must provide either ids or set that to `all` to complete all the tours"
            );

          const completeAll = ids === "all";

          return get().tours.forEach((t) => {
            if (completeAll || ids.includes(t.id)) {
              get().complete(t.id);
            }
          });
        },
        finish: () => set(() => ({ completed: new Date() })),
        reopen: () => set(() => ({ completed: null })),
        find: (id) => {
          const { tours } = get();
          return tours.find((t) => t.id === id);
        },
        findMany: (ids) => {
          if (ids === "all") return get().tours;

          return get().tours.filter((t) => ids.includes(t.id)) || [];
        },
        add: (tour) =>
          set((state) => {
            const exists = get().find(tour.id);

            if (exists)
              throw new Error(`Tour with id ${tour.id} already exists`);

            const tours = {
              tours: Array.isArray(state.tours)
                ? [...state.tours, tour]
                : [tour],
            };
            return tours;
          }),
        update: (id, tour) =>
          set((state) => ({
            tours: state.tours.map((t) =>
              t.id === id
                ? {
                    ...t,
                    ...tour,
                  }
                : t
            ),
          })),
        addMany: (tours) =>
          set((state) => {
            const _tours = {
              tours: Array.isArray(state.tours)
                ? [...state.tours, ...tours]
                : tours,
            };
            return _tours;
          }),
        delete: (id) =>
          set((state) => ({
            tours: state.tours.filter((t) => t.id === id),
          })),
        deleteMany: (ids) =>
          ids === "all"
            ? get().reset()
            : set((state) => ({
                tours: state.tours.filter((t) => ids.includes(t.id)),
              })),
        reset: () =>
          set(() => ({
            tours: [],
          })),
      }),
      {
        name: "tours",
      }
    )
  )
);
type Step = {
  id: string;
  tourId: string;
  order: number;
  completed?: Date;
  meta: Record<string, any>;
};
type StepsState = {
  steps: Step[];
  complete: (id: string, tourId: string) => void;
  uncomplete: (id: string, tourId: string) => void;
  completeMany: (tourId: string | "all", ids?: string[] | "all") => void;
  find: (id: string, tourId: string) => Step | undefined;
  findMany: (tourId: string | "all", ids: string[] | "all") => Step[];
  add: (step: Step) => void;
  update: (id: string, tourId: string, step: Omit<Step, "id">) => void;
  addMany: (steps: Step[]) => void;
  delete: (id: string, tourId: string) => void;
  deleteMany: (tourId: string | "all", ids: string[] | "all") => void;
  uncompleteMany: (tourId: string | "all", ids: string[] | "all") => void;
  settle: () => void;
  clean: () => void;
  reset: () => void;
};
const useSteps = create<StepsState>()(
  devtools(
    persist(
      (set, get) => ({
        steps: [],
        complete: (id, tourId) =>
          set((state) => ({
            steps: state.steps.map((t) =>
              t.id === id && t.tourId === tourId
                ? {
                    ...t,
                    completed: new Date(),
                  }
                : t
            ),
          })),
        uncomplete(id, tourId) {
          return set((state) => ({
            steps: state.steps.map((t) =>
              t.id === id && t.tourId === tourId
                ? {
                    ...t,
                    completed: undefined,
                  }
                : t
            ),
          }));
        },
        completeMany: (tourId, ids) => {
          const completeAll = ids === "all";
          const wantsSettle = tourId === "all";

          if (wantsSettle && !completeAll) {
            throw new Error("You cannot provide ids and set tourId to `all`");
          }

          if (wantsSettle) {
            get().settle();
            return;
          }

          // tourId is not "all"

          get()
            .steps.filter((t) => t.tourId === tourId)
            .forEach((t) => {
              if (completeAll || (ids as string[]).includes(t.id)) {
                get().complete(t.id, t.tourId);
              }
            });
        },
        uncompleteMany(tourId, ids) {
          const uncompleteAll = ids === "all";
          const wantsAll = tourId === "all";

          if (wantsAll && !uncompleteAll) {
            throw new Error("You cannot provide ids and set tourId to `all`");
          }

          if (wantsAll) {
            return set((state) => ({
              steps: state.steps.map((t) => ({
                ...t,
                completed: undefined,
              })),
            }));
          }

          // tourId is not "all"

          get()
            .steps.filter((t) => t.tourId === tourId)
            .forEach((t) => {
              if (uncompleteAll || (ids as string[]).includes(t.id)) {
                get().uncomplete(t.id, t.tourId);
              }
            });
        },
        find: (id, tourId) => {
          return get().steps.find((t) => t.id === id && t.tourId === tourId);
        },

        findMany: (tourId, ids) => {
          const wantsAll = ids === "all";
          const swipe = tourId === "all";

          // want all the steps for all the tours
          if (wantsAll && swipe) {
            return get().steps;
          }

          // want all the steps for a specific tour
          if (wantsAll) {
            return get().steps.filter((t) => t.tourId === tourId);
          }

          // want specific steps for 'all' tours
          if (swipe) {
            return get().steps.filter((t) => ids.includes(t.id));
          }

          // want specific steps for a specific tour
          return get().steps.filter(
            (t) => t.tourId === tourId && ids.includes(t.id)
          );
        },
        add: (step) => {
          const targetedTour = useTours.getState().find(step.tourId);

          if (!targetedTour)
            throw new Error(
              `Tour with id ${step.tourId} does not exist. Please create it first`
            );

          const stepExists = get().find(step.id, step.tourId);

          const toursFinished = useTours.getState().completed;
          const tourCompleted = targetedTour.completed;

          if (toursFinished) {
            useTours.getState().open();
          }
          if (tourCompleted) {
            useTours.getState().open(step.tourId);
          }

          if (stepExists)
            throw new Error(
              `Step with id ${step.id} already exists for tour ${step.tourId}`
            );

          return set((state) => ({
            steps: Array.isArray(state.steps) ? [...state.steps, step] : [step],
          }));
        },
        update: (id, tourId, step) =>
          set((state) => ({
            steps: state.steps.map((t) =>
              t.id === id && t.tourId === tourId
                ? {
                    ...t,
                    ...step,
                  }
                : t
            ),
          })),
        addMany: (steps) => {
          const tours = steps.map((s) => s.tourId);

          const missingTours = tours.filter(
            (t) => !useTours.getState().find(t)
          );

          if (missingTours.length > 0)
            throw new Error(
              `Tours with ids ${missingTours.join(
                ", "
              )} do not exist. Please create them first`
            );

          for (const step of steps) {
            const stepExists = get().find(step.id, step.tourId);

            if (stepExists)
              throw new Error(
                `Step with id ${step.id} already exists for tour ${step.tourId}`
              );
          }

          set((state) => ({
            steps: Array.isArray(state.steps)
              ? [...state.steps, ...steps]
              : steps,
          }));
        },
        delete: (id) =>
          set((state) => ({
            steps: state.steps.filter((t) => t.id === id),
          })),
        deleteMany: (tourId, ids) => {
          // user wants to delete all steps for all tours
          if (tourId === "all" && ids === "all") {
            return get().reset();
          }
          if (tourId === "all") {
            return set((state) => ({
              steps: state.steps.filter((t) => ids.includes(t.id)),
            }));
          }
          return set((state) => ({
            steps: state.steps.filter(
              (t) => ids.includes(t.id) && t.tourId === tourId
            ),
          }));
        },
        settle: () => {
          set((state) => ({
            steps: state.steps.map((t) => ({
              ...t,
              completed: new Date(),
            })),
          }));
        },
        clean: () =>
          set((state) => ({
            steps: state.steps.filter((t) => !t.completed),
          })),
        reset: () =>
          set(() => ({
            steps: [],
          })),
      }),
      {
        name: "steps",
      }
    )
  )
);

const useStep = (args?: { stepId?: string; tourId?: string }) => {
  return {
    ...stepOps(
      useSteps.getState(),
      useTours.getState(),
      args?.stepId,
      args?.tourId
    ),
    ...stepsOps(
      useSteps.getState(),
      useTours.getState(),
      args?.stepId,
      args?.tourId
    ),
  };
};
const useTour = (args?: { tourId?: string }) => {
  const toursState = useTours();
  const stepsState = useSteps();

  return {
    ...tourOps(toursState, stepsState, args?.tourId),
    ...toursOps(toursState, stepsState, args?.tourId),
  };
};

type PartialTour<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
const stepOps = (
  stepsState: StepsState,
  toursStore: ToursState,
  stepId?: string,
  tourId?: string
) => {
  type SharedArgs = { stepId?: string; tourId?: string };
  return {
    /**
     * @description Complete a step
     */
    complete: (args?: SharedArgs) => {
      const sId = args?.stepId || stepId;
      const tId = args?.tourId || tourId;
      invariant(sId, "stepId is required");
      invariant(tId, "tourId is required");

      // complete step
      stepsState.complete(sId, tId);

      // check if this was the last step
      const isCompleted = stepsState.steps
        .filter((step) => step.tourId === tId)
        .every((step) => step.completed);

      // if so, complete the tour
      if (isCompleted) {
        toursStore.complete(tId);
      }
    },
    update: (newData: Omit<Step, "id">, args?: SharedArgs) => {
      const sId = args?.stepId || stepId;
      const tId = args?.tourId || tourId;
      invariant(sId, "stepId is required");
      invariant(tId, "tourId is required");

      stepsState.update(sId, tId, {
        ...newData,
      });
    },
    delete: (args?: SharedArgs) => {
      const sId = args?.stepId || stepId;
      const tId = args?.tourId || tourId;
      invariant(sId, "stepId is required");
      invariant(tId, "tourId is required");

      stepsState.delete(sId, tId);
    },
    next: (args?: SharedArgs) => {
      const sId = args?.stepId || stepId;
      const tId = args?.tourId || tourId;
      invariant(sId, "stepId is required");
      invariant(tId, "tourId is required");

      const steps = stepsState.steps
        .filter((step) => step.tourId === tId)
        .sort((a, b) => a.order - b.order);

      const currentStep = steps.find((step) => step.id === sId);

      if (!currentStep) return null;

      const nextStep = steps.find(
        (step) => step.order > currentStep.order && !step.completed
      );

      return nextStep;
    },
    prev: (args?: SharedArgs) => {
      const sId = args?.stepId || stepId;
      const tId = args?.tourId || tourId;
      invariant(sId, "stepId is required");
      invariant(tId, "tourId is required");

      const steps = stepsState.steps
        .filter((step) => step.tourId === tId)
        .sort((a, b) => a.order - b.order);

      const currentStep = steps.find((step) => step.id === sId);

      if (!currentStep) return null;

      const prevStep = steps.find(
        (step) => step.order < currentStep.order && !step.completed
      );

      return prevStep;
    },
    completed: (args?: SharedArgs) => {
      const sId = args?.stepId || stepId;
      const tId = args?.tourId || tourId;
      invariant(sId, "stepId is required");
      invariant(tId, "tourId is required");

      const step = stepsState.steps.find(
        (step) => step.id === sId && step.tourId === tId
      );
      if (!step) throw new Error("step not found");

      return !!step.completed;
    },
  };
};
const stepsOps = (
  stepsState: StepsState,
  toursState: ToursState,
  stepId?: string,
  tourId?: string
) => {
  type SharedArgs = { stepId?: string; tourId?: string };
  return {
    /**
     * @description Add a step
     *
     * @param step step to add
     *
     * @throws { Error } if tour doesn't exist
     * @throws { Error } if step already exists
     */
    create: (step: PartialTour<Step, "tourId">) => {
      const tId = step?.tourId || tourId;
      invariant(tId, "tourId is required");

      return stepsState.add({
        ...step,
        tourId: tId,
      });
    },
    /**
     * @description Add many steps
     *
     * @param steps steps to add
     *
     * @throws { Error } if tour doesn't exist
     * @throws { Error } if step already exists
     */
    createMany: (steps: Array<PartialTour<Step, "tourId">>) => {
      return stepsState.addMany(
        steps.map((step) => {
          const tId = step?.tourId || tourId;
          invariant(tId, "tourId is required");

          return {
            ...step,
            tourId: tId,
          };
        })
      );
    },
    find: (args?: SharedArgs) => {
      const sId = args?.stepId || stepId;
      const tId = args?.tourId || tourId;
      invariant(sId, "stepId is required");
      invariant(tId, "tourId is required");

      return stepsState.find(sId, tId);
    },
    findMany: (args: { stepsIds: string[] | "all"; tourId?: string }) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      return stepsState.findMany(tId, args.stepsIds);
    },
    deleteMany: (args: { stepsIds: string[] | "all"; tourId?: string }) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      return stepsState.deleteMany(tId, args.stepsIds);
    },
    count: (
      args?: { tourId?: string },
      filter?: { completed?: boolean | "all" }
    ) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      const { completed = "all" } = filter || {};

      return stepsState.steps
        .filter((step) => step.tourId === tId)
        .filter((step) => {
          if (completed === "all") return true;
          return completed ? step.completed : !step.completed;
        }).length;
    },
  };
};
const tourOps = (
  toursState: ToursState,
  stepsState: StepsState,
  tourId?: string
) => {
  type SharedArgs = { tourId?: string };

  return {
    /**
     * @description Complete a tour with all of its steps
     */
    complete: (args?: SharedArgs) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");
      // complete tour
      toursState.complete(tId);

      // complete all its steps
      stepsState.completeMany(tId, "all");

      // check if this was the last tour to complete
      const isCompleted = toursState.tours.every((tour) => tour.completed);

      // if so, set the state to completed
      if (isCompleted) {
        toursState.finish();
      }
    },
    update: (newData: Omit<Tour, "id">, args?: SharedArgs) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      toursState.update(tId, newData);
    },
    delete: (args?: SharedArgs) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      toursState.delete(tId);
      stepsState.deleteMany(tId, "all");
    },
    step: (args?: SharedArgs & { stepId?: string }) => {
      const _tId = args?.tourId || tourId;
      const _sId = args?.stepId;

      return {
        ...stepOps(stepsState, toursState, _sId, _tId),
        ...stepsOps(stepsState, toursState, _sId, _tId),
      };
    },
    completed: (args?: SharedArgs) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      const tour = toursState.find(tId);
      if (!tour) throw new Error("tour not found");

      return tour?.completed;
    },
    uncomplete: (args?: SharedArgs) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      toursState.uncomplete(tId);

      stepsState.uncompleteMany(tId, "all");
    },
  };
};
const toursOps = (
  toursState: ToursState,
  stepsState: StepsState,
  tourId?: string
) => {
  type SharedArgs = { tourId?: string };

  return {
    /**
     * @description Get the number of tours left to complete
     */
    left: toursState.tours.filter((tour) => !tour.completed).length,
    create: (id: string, steps?: Array<Omit<Step, "tourId">>) => {
      // add a tour
      toursState.add({ id });

      // add steps
      if (steps) {
        stepsState.addMany(steps.map((step) => ({ ...step, tourId: id })));
      }
    },
    createMany: (tours: Array<{ id: string; steps?: Array<Step> }>) => {
      // add tours
      toursState.addMany(tours.map((tour) => ({ id: tour.id })));

      // add steps
      for (const tour of tours) {
        if (tour.steps) {
          stepsState.addMany(
            tour.steps.map((step) => ({ ...step, tourId: tour.id }))
          );
        }
      }
    },
    /**
     * @description Complete many tours
     *
     * @param <ids: Array<string> | "all"> ids of tours to complete or "all" to complete all tours
     */
    completeMany: (ids: Array<string> | "all") => {
      const wantsAll = ids === "all";

      // complete tours
      toursState.completeMany(ids);
      toursState.finish();

      // complete tours` steps
      if (wantsAll) {
        stepsState.completeMany("all", "all");
        return;
      }

      for (const id of ids) {
        stepsState.completeMany(id, "all");
      }
    },
    /**
     * @description Get a tour
     */
    find: (args?: SharedArgs) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      const tour = toursState.find(tId);
      if (!tour) return null;
      return {
        ...tour,
        steps: stepsState.steps.filter((step) => step.tourId === tour.id),
      };
    },
    /**
     * @description Get many tours
     *
     * @param ids ids of tours to get or "all" to get all tours
     * @returns Array of tours with their steps
     */
    findMany: (ids: Array<string> | "all") => {
      const tours = toursState.findMany(ids);
      return tours.map((tour) => ({
        ...tour,
        steps: stepsState.steps.filter((step) => step.tourId === tour.id),
      }));
    },
    /**
     * @description counts tours
     *
     * @param filter { completed?: boolean | "all" } filter by completed or not completed or all
     * @returns
     */
    count: (filter?: { completed?: boolean | "all" }) => {
      const { completed = "all" } = filter || {};

      return toursState.tours.filter((tour) => {
        if (completed === "all") return true;
        return completed ? tour.completed : !tour.completed;
      }).length;
    },
    deleteMany: (ids: Array<string> | "all") => {
      const wantsAll = ids === "all";

      // delete tours
      toursState.deleteMany(ids);

      // delete tours` steps
      if (wantsAll) {
        stepsState.deleteMany("all", "all");
        return;
      }

      for (const id of ids) {
        stepsState.deleteMany(id, "all");
      }
    },
    findFirstIncompleteStep: (args?: SharedArgs) => {
      const tId = args?.tourId || tourId;
      invariant(tId, "tourId is required");

      const tour = toursState.find(tId);
      if (!tour) return null;

      const steps = stepsState.steps.filter((step) => step.tourId === tour.id);

      return steps.find((step) => !step.completed);
    },
  };
};

export { useStep, useTour };
export type { Step, Tour };

const Test = () => {
  // const step = useStep({stepId: "step_id", tourId: "tour_id"});
  // step.complete();
  // step.find();
  // step.findMany({ stepsIds: "all" });

  // const step = useStep({tourId: 'tour_id'});
  // step.complete({ stepId: "step_id" });
  // step.find({ stepId: "step_id" });
  // step.findMany({ stepsIds: 'all' });

  // const step = useStep();
  // step.complete({ stepId: "step_id", tourId: "tour_id" });
  // step.find({ stepId: "step_id", tourId: "tour_id" });
  // step.findMany({ stepsIds: "all", tourId: "tour_id" });
  // Here the `tourId` overrides the `tourId` you initially passed to `useStep`
  // same for `stepId`

  // const tour = useTour({ tourId: "tour_id" });
  // tour.complete();
  // tour.find();
  // tour.findMany('all')

  // const tour = useTour();
  // tour.complete({ tourId: "tour_id" });
  // tour.find({ tourId: "tour_id" });
  // tour.findMany("all");
  // Here the `tourId` overrides the `tourId` you initially passed to `useTour`

  // You can handle steps from `useTour` too
  const tour = useTour({ tourId: "tour_id" });
  tour.step({ stepId: "step_id" }).complete();
  tour.step({ stepId: "step_id" }).find();

  const cond = Math.random() > 0.5;

  const s = cond && (tour.find()?.steps || []);

  // const tour = useTour();
  // tour.step().complete({ stepId: "step_id", tourId: "tour_id" });
  // tour.step().find({ stepId: "step_id", tourId: "tour_id" });
  // tour.step().findMany({ stepsIds: "all", tourId: "tour_id" });
};
