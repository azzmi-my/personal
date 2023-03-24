## 🚢 Touric

This is a headless tour react library, means you can use it to know if you should show a tour or not, and you can use it to complete a tour or a step, but you can't use it to show a tour or a step, you have to do it yourself.

- ✅ Typescript
- ✅ Progressive

### Usage

```ts
//
```

## `useStep`

```ts
const step = useStep({ stepId: "..", tourId: ".." });
step.complete();
step.find();
step.findMany({ stepsIds: "all" });

// OR
const step = useStep({ tourId: ".." });
step.complete({ stepId: ".." });
step.find({ stepId: ".." });
step.findMany({ stepsIds: "all" });

// OR
const step = useStep();
step.complete({ stepId: "..", tourId: ".." });
step.find({ stepId: "..", tourId: ".." });
step.findMany({ stepsIds: "all", tourId: ".." });
// Here the `tourId` overrides the `tourId` you initially passed to `useStep`
// same for `stepId`
```

## `useTour`

```ts
const tour = useTour({ tourId: ".." });
tour.complete();
tour.find();
tour.findMany("all");

// OR
const tour = useTour();
tour.complete({ tourId: ".." });
tour.find({ tourId: ".." });
tour.findMany("all");
// Here the `tourId` overrides the `tourId` you initially passed to `useTour`
```

You can handle steps from `useTour` too

```ts
const tour = useTour({ tourId: ".." });
tour.step({ stepId: ".." }).complete();
tour.step({ stepId: ".." }).find();
tour.step().findMany({ stepsIds: "all" });

// OR
const tour = useTour();
tour.step().complete({ stepId: "..", tourId: ".." });
tour.step().find({ stepId: "..", tourId: ".." });
tour.step().findMany({ stepsIds: "all", tourId: ".." });
```

## `hooks` methods exposed

```ts
.create()
.createMany()
.update()
.delete()
.find()
.findMany()
.complete()
.completeMany()
.count()

// only in `useStep`
.next()
.prev()

// only in `useTour`
.step()
.left
```

## Examples

```ts
// I need `useTouric` to expose a step component in a context of a tour
const Step = () => {};
```

What I want?

```ts
const Touric
const Tour = ({ name, children }) => {
  const tour = useTour({ tourId: name });
  const completed = tour.completed();
  //    ^ null | undefined | Date
  const stepsLeft = !completed && (tour.find()?.steps || []);
  return <Touric show={!completed}>{children}</Touric>;
};
const Step = ({ name }) => {
    const step = useStep({ stepId: name });
    const completed = step.completed();
    //    ^ null | undefined | Date
    return (
        <>
    )
}
// in `/purchases`
const Purchases = () => {
    const addToCartRef = useRef();
    return (
        <Tour name="purchases">
            <Step name="add_to_cart" targetRef={addToCartRef} />
            <AddToCart ref={targetedRef} />
        </Tour>
    )
}
```
