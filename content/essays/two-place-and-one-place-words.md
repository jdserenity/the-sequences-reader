# 2-Place and 1-Place Words 

[Source][1][Markdown][2] · [Talk][3][?][4] 

[Home][5][About][6][Search][7][Contents][8] 

# 2-Place and 1-Place Words

❦ 

I have previously spoken of the ancient, pulp-era magazine covers that showed a bug-eyed monster carrying off a girl in a torn dress; and about how people think as if sexiness is an inherent property of a sexy entity, without dependence on the admirer. 

“Of *course* the bug-eyed monster will prefer human females to its own kind,” says the artist (who we’ll call Fred); “it can see that human females have soft, pleasant skin instead of slimy scales. It may be an alien, but it’s not *stupid*—why are you expecting it to make such a basic mistake about sexiness?” 

What is Fred’s error? It is treating a function of 2 arguments (“2-place function”): 

`Sexiness: Admirer, Entity ➝ [0, ∞)` , 

as though it were a function of 1 argument (“1-place function”): 

`Sexiness: Entity ➝ [0, ∞)` . 

If `Sexiness` is treated as a function that accepts only one `Entity` as its argument, then of course `Sexiness` will appear to depend only on the `Entity`, with nothing else being relevant. 

When you think about a two-place function as though it were a one-place function, you end up with a [Variable Question Fallacy][9] / [Mind Projection Fallacy][10]. Like trying to determine whether a building is *intrinsically* on the left or on the right side of the road, independent of anyone’s travel direction. 

An alternative and equally valid standpoint is that “sexiness” *does* refer to a one-place function—but each speaker uses a *different* one-place function to decide who to kidnap and ravish. Who says that just because Fred, the artist, and Bloogah, the bug-eyed monster, both use the word “sexy,” they must mean the same thing by it? 

If you take this viewpoint, there is no paradox in speaking of some woman intrinsically having 5 units of `Fred::Sexiness`. All onlookers can agree on this fact, once `Fred::Sexiness` has been specified in terms of curves, skin texture, clothing, status cues, etc. This specification need *make no mention of Fred*, only the woman to be evaluated. 

It so happens that Fred, himself, *uses* this algorithm to select flirtation targets. But that doesn’t mean the algorithm itself has to *mention* Fred. So Fred’s `Sexiness` function really *is* a function of one argument—the woman—on this view. I called it `Fred::Sexiness`, but remember that this name refers to a function that is being described independently of Fred. Maybe it would be better to write: 

`Fred::Sexiness == Sexiness_20934` . 

It is an empirical fact about Fred that he uses the function `Sexiness_20934` to evaluate potential mates. Perhaps John uses exactly the same algorithm; it doesn’t matter where it comes from once we have it. 

And similarly, the same woman has only 0.01 units of `Sexiness_72546`, whereas a slime mold has 3 units of `Sexiness_72546`. It happens to be an empirical fact that Bloogah uses `Sexiness_72546` to decide who to kidnap; that is, `Bloogah::Sexiness` names the fixed Bloogah-independent mathematical object that is the function `Sexiness_72546`. 

Once we say that the woman has 0.01 units of `Sexiness_72546` and 5 units of `Sexiness_20934`, all observers can agree on this without paradox. 

And the two 2-place and 1-place views can be unified using the concept of “currying,” named after the mathematician Haskell Curry. Currying is a technique allowed in certain programming languages, where e.g. instead of writing 

`x = plus(2, 3)` (*x* = 5) , 

you can also write 

`y = plus(2)` 

(`y` is now a “curried” form of the function `plus`, which has eaten a 2) 

`x = y(3)` (*x* = 5) 

`z = y(7)` (*z* = 9) . 

So `plus` is a 2-place function, but currying `plus`—letting it eat only one of its two required arguments—turns it into a 1-place function that adds 2 to any input. (Similarly, you could start with a 7-place function, feed it 4 arguments, and the result would be a 3-place function, etc.) 

A true purist would insist that all functions should be viewed, by definition, as taking exactly one argument. On this view, `plus` accepts one numeric input, and outputs a *new* function; and this *new* function has one numeric input and finally outputs a number. On this view, when we write `plus(2,3)` we are really computing `plus(2)` to get a function that adds 2 to any input, and then applying the result to 3. A programmer would write this as: 

`plus: int ➝ (int ➝ int)`. 

This says that `plus` takes an `int` as an argument, and returns a function of type `int ➝ int`. 

Translating the metaphor back into the human use of words, we could imagine that “sexiness” starts by eating an `Admirer`, and spits out the fixed *mathematical* object that describes how the `Admirer` currently evaluates pulchritude. It is an *empirical* fact about the Admirer that their intuitions of desirability are computed in a way that is isomorphic to this *mathematical* function. 

Then the mathematical object spit out by currying `Sexiness(Admirer)` can be applied to the `Woman`. If the `Admirer` was originally Fred, `Sexiness(Fred)` will first return `Sexiness_20934`. We can then say it is an empirical fact about the `Woman`, independently of Fred, that `Sexiness_20934(Woman) = 5`. 

In Hilary Putnam’s “Twin Earth” thought experiment, there was a tremendous philosophical brouhaha over whether it makes sense to postulate a Twin Earth that is just like our own, except that instead of water being H2O, water is a different transparent flowing substance, XYZ. And furthermore, set the time of the thought experiment a few centuries ago, so in neither our Earth nor the Twin Earth does anyone know how to test the alternative hypotheses of H2O vs. XYZ. Does the word “water” mean the same thing in that world as in this one? 

Some said, “Yes, because when an Earth person and a Twin Earth person utter the word ‘water,’ they have the same sensory test in mind.” 

Some said, “No, because ‘water’ in our Earth means H2O and ‘water’ in the Twin Earth means XYZ.” 

If you think of “water” as a concept that *begins* by eating a world to find out the empirical true nature of that transparent flowing stuff, and *returns* a new fixed concept Water42 or H2O, then this world-eating concept is the same in our Earth and the Twin Earth; it just returns different answers in different places. 

If you think of “water” as meaning H2O, then the concept does nothing different when we transport it between worlds, and the Twin Earth contains no H2O. 

And of course there is no point in arguing over what the sound of the syllables “wa-ter” [really means][11]. 

So should you pick one definition and use it consistently? But it’s not that easy to save yourself from confusion. You have to train yourself to be *deliberately aware* of the distinction between the curried and uncurried forms of concepts. 

When you take the uncurried water concept and apply it in a different world, it is the same concept but it *refers* to a different thing; that is, we are applying a constant world-eating function to a different world and obtaining a different return value. In the Twin Earth, XYZ is “water” and H2O is not; in our Earth, H2O is “water” and XYZ is not. 

On the other hand, if you take “water” to refer to what the prior thinker would call “the result of applying ‘water’ to our Earth,” then in the Twin Earth, XYZ is not water and H2O is. 

The whole confusingness of the subsequent philosophical debate rested on a tendency to *instinctively* curry concepts or *instinctively* uncurry them. 

Similarly it takes an extra step for Fred to realize that other agents, like the Bug-Eyed-Monster agent, will choose kidnappees for ravishing based on `Sexiness_BEM(Woman)`, not `Sexiness_Fred(Woman)`. To do this, Fred must consciously re-envision `Sexiness` as a function with two arguments. All Fred’s brain does by instinct is evaluate `Woman.sexiness`—that is, `Sexiness_Fred(Woman)`; but it’s simply labeled `Woman.sexiness`. 

The fixed mathematical function `Sexiness_20934` makes no mention of Fred or the BEM, only women, so Fred does not *instinctively* see why the BEM would evaluate “sexiness” any differently. And indeed the BEM would *not* evaluate `Sexiness_20934` any differently, if for some odd reason it cared about the result of that particular function; but it is an *empirical* fact about the BEM that it uses a different function *to decide who to kidnap*. 

If you’re wondering as to the point of this analysis, try putting the above distinctions to work to [Taboo][12] such confusing words as “objective,” “subjective,” and “arbitrary.” 

[![][https://www.readthesequences.com/wiki/uploads/star.svg]][13]

[Sorting Pebbles into Correct Heaps][14] 

[Top][8] 

[Book][15] 

[Sequence][16] 

[What Would You Do Without Morality?][17]

 [1]: https://www.readthesequences.com/Two-Place-And-One-Place-Words?action=source "View PmWiki source for “2-Place and 1-Place Words”"
 [2]: https://www.readthesequences.com/Two-Place-And-One-Place-Words?action=markdown "View “2-Place and 1-Place Words” in Markdown format"
 [3]: https://www.readthesequences.com/Talk/Two-Place-And-One-Place-Words?action=edit "View the Talk page for “2-Place and 1-Place Words”"
 [4]: https://www.readthesequences.com/Talk/Two-Place-And-One-Place-Words?action=edit
 [5]: https://www.readthesequences.com/
 [6]: https://www.readthesequences.com/About
 [7]: https://www.readthesequences.com/Search
 [8]: https://www.readthesequences.com/Contents
 [9]: https://www.readthesequences.com/VariableQuestionFallacies
 [10]: https://www.readthesequences.com/MindProjectionFallacy
 [11]: https://www.readthesequences.com/DisputingDefinitions
 [12]: https://www.readthesequences.com/TabooYourWords
 [13]: https://www.greaterwrong.com/lw/ro/2place_and_1place_words#comments "View Less Wrong discussion thread for “2-Place and 1-Place Words”"
 [14]: https://www.readthesequences.com/SortingPebblesIntoCorrectHeaps
 [15]: https://www.readthesequences.com/Book-V-MereGoodness
 [16]: https://www.readthesequences.com/ValueTheorySequence
 [17]: https://www.readthesequences.com/WhatWouldYouDoWithoutMorality