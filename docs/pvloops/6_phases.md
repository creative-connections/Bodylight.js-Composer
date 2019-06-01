---
id: 6_phases
title: Phases
---

<iframe src="https://www.youtube-nocookie.com/embed/kJka43X7qbs" frameBorder="0" width="100%" height="400px" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>

* Our model provides a value for the phase
* Let's create a label for it
* And bind the label to leftHeartCycle
* And is a little bit too fast
* This is not very helpful
* Let’s change that by creating an integer to text mapping function

```
value => {
    switch (value) {
    case 1:
        return 'Cycle: left ventricle filling';
    case 2:
        return 'Cycle: left ventricle filling and atrial systole';
    case 3:
        return 'Cycle: left ventricle isovolumic contraction';
    case 4:
        return 'Cycle: left ventricle ejection';
    case 5:
        return 'Cycle: left ventricle isovolumic relaxation';
    }
};
```

* Much better
* Now some final touches
* Next time we will be adding charts

[Composer project file (.bjp)](../examples/pvloops/5.bjp)
