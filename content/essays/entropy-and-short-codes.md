<br />
<b>Warning</b>:  Undefined array key 0 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 1 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 2 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 3 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 0 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 1 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 2 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 3 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 0 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 1 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 0 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 1 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 0 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 1 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 2 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 3 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
# Entropy, and Short Codes 

[Source][1][Markdown][2] · [Talk][3] 

[Home][4][About][5][Search][6][Contents][7] 

# Entropy, and Short Codes

❦ 

(If you aren’t familiar with Bayesian inference, this may be a good time to read [An Intuitive Explanation of Bayes’s Theorem][8].) 

Suppose you have a system *X* that’s equally likely to be in any of 8 possible states: 

{*X*1, *X*2, *X*3, *X*4, *X*5, *X*6, *X*7, *X*8}. 

There’s an extraordinarily ubiquitous quantity—in physics, mathematics, and even biology—called *entropy*; and the entropy of *X* is 3 bits. This means that, on average, we’ll have to ask 3 yes-or-no questions to find out *X*’s value. For example, someone could tell us *X*’s value using this code: 

| *X*1 : 001 | *X*2 : 010 | *X*3 : 011 | *X*4 : 100  |
||
| *X*5 : 101 | *X*6 : 110 | *X*7 : 111 | *X*8 : 000. |

So if I asked “Is the first symbol 1?” and heard “yes,” then asked “Is the second symbol 1?” and heard “no,” then asked “Is the third symbol 1?” and heard “no,” I would know that *X* was in state 4. 

Now suppose that the system *Y* has four possible states with the following probabilities: 

| *Y*1 : 1/2 (50%)   | *Y*2 : 1/4 (25%)    |
||
| *Y*3 : 1/8 (12.5%) | *Y*4 : 1/8 (12.5%). |

Then the entropy of *Y* would be 1.75 bits, meaning that we can find out its value by asking 1.75 yes-or-no questions. 

What does it mean to talk about asking one and three-fourths of a question? Imagine that we designate the states of Y using the following code: 

| *Y*1 : 1 | *Y*2 : 01 | *Y*3 : 001 | *Y*4 : 000. |
||

First you ask, “Is the first symbol 1?” If the answer is “yes,” you’re done: *Y* is in state 1. This happens half the time, so 50% of the time, it takes 1 yes-or-no question to find out *Y*’s state. 

Suppose that instead the answer is “No.” Then you ask, “Is the second symbol 1?” If the answer is “yes,” you’re done: *Y* is in state 2. The system *Y* is in state 2 with probability 1/4, and each time *Y* is in state 2 we discover this fact using two yes-or-no questions, so 25% of the time it takes 2 questions to discover *Y*’s state. 

If the answer is “No” twice in a row, you ask “Is the third symbol 1?” If “yes,” you’re done and *Y* is in state 3; if “no,” you’re done and *Y* is in state 4. The 1/8 of the time that *Y* is in state 3, it takes three questions; and the 1/8 of the time that *Y* is in state 4, it takes three questions. 

(1/2 × 1) + (1/4 × 2) + (1/8 × 3) + (1/8 × 3) 

= 0.5 + 0.5 + 0.375 + 0.375 

= 1.75. 

The general formula for the entropy *H*(*S*) of a system *S* is the sum, over all *Si*, of −*P*(*Si*)log2(*P*(*Si*)). 

For example, the log (base 2) of 1/8 is −3. So −(1/8 × −3) = 0.375 is the contribution of state *S*4 to the total entropy: 1/8 of the time, we have to ask 3 questions. 

You can’t always devise a perfect code for a system, but if you have to tell someone the state of arbitrarily many copies of *S* in a single message, you can get arbitrarily close to a perfect code. (Google “arithmetic coding” for a simple method.) 

Now, you might ask: “Why not use the code 10 for *Y*4, instead of 000? Wouldn’t that let us transmit messages more quickly?” 

But if you use the code 10 for *Y*4, then when someone answers “Yes” to the question “Is the first symbol 1?,” you won’t know yet whether the system state is *Y*1 (1) or *Y*4 (10). In fact, if you change the code this way, the whole system falls apart—because if you hear “1001,” you don’t know if it means “*Y*4, followed by *Y*2” or “*Y*1, followed by *Y*3.” 

The moral is that *short words are a conserved resource*. 

The key to creating a good code—a code that transmits messages as compactly as possible—is to reserve short words for things that you’ll need to say frequently, and use longer words for things that you won’t need to say as often. 

When you take this art to its limit, the length of the message you need to describe something corresponds exactly or almost exactly to its probability. This is the Minimum Description Length or Minimum Message Length formalization of [Occam’s Razor][9]. 

And so even the *labels* that we use for words are not quite arbitrary. The sounds that we attach to our concepts can be better or worse, wiser or more foolish. Even apart from considerations of [common usage][10]! 

I say all this, because the idea that “You can *X* any way you like” is a huge obstacle to learning how to *X* wisely. “It’s a free country; I have [a right to my own opinion][11]” obstructs the art of finding truth. “I can define a word any way I like” obstructs the art of [carving reality at its joints][12]. And even the sensible-sounding “The labels we attach to words are arbitrary” obstructs awareness of compactness. Prosody too, for that matter—Tolkien once observed what a beautiful sound the phrase “cellar door” makes; that is the kind of awareness it takes to use language like Tolkien. 

The length of words also plays a nontrivial role in the cognitive science of language: 

Consider the phrases “recliner,” “chair,” and “furniture.” Recliner is a more specific category than chair; furniture is a more general category than chair. But the vast majority of chairs have a common use—you use the same sort of motor actions to sit down in them, and you sit down in them for the same sort of purpose (to take your weight off your feet while you eat, or read, or type, or rest). Recliners do not depart from this theme. “Furniture,” on the other hand, includes things like beds and tables which have different uses, and call up different motor functions, from chairs. 

In the terminology of cognitive psychology, “chair” is a *basic-level category*. 

People have a tendency to talk, and presumably think, at the basic level of categorization—to draw the boundary around “chairs,” rather than around the more specific category “recliner,” or the more general category “furniture.” People are more likely to say “You can sit in that chair” than “You can sit in that recliner” or “You can sit in that furniture.” 

And it is no coincidence that the word for “chair” contains fewer syllables than either “recliner” or “furniture.” Basic-level categories, in general, tend to have short names; and nouns with short names tend to refer to basic-level categories. Not a perfect rule, of course, but a definite tendency. Frequent use goes along with short words; short words go along with frequent use. 

Or as Douglas Hofstadter put it, there’s a reason why the English language uses “the” to mean “the” and “antidisestablishmentarianism” to mean “antidisestablishmentarianism” instead of antidisestablishmentarianism other way around. 

[![][https://www.readthesequences.com/wiki/uploads/star.svg]][13]

[Where to Draw the Boundary?][12] 

[Top][7] 

[Book][14] 

[Sequence][15] 

[Mutual Information, and Density in Thingspace][16]

 [1]: https://www.readthesequences.com/Entropy-And-Short-Codes?action=source "View PmWiki source for “Entropy, and Short Codes”"
 [2]: https://www.readthesequences.com/Entropy-And-Short-Codes?action=markdown "View “Entropy, and Short Codes” in Markdown format"
 [3]: https://www.readthesequences.com/Talk/Entropy-And-Short-Codes "View the Talk page for “Entropy, and Short Codes”"
 [4]: https://www.readthesequences.com/
 [5]: https://www.readthesequences.com/About
 [6]: https://www.readthesequences.com/Search
 [7]: https://www.readthesequences.com/Contents
 [8]: https://www.readthesequences.com/AnIntuitiveExplanationOfBayessTheorem
 [9]: https://www.readthesequences.com/OccamsRazor
 [10]: https://www.readthesequences.com/TheArgumentFromCommonUsage
 [11]: http://www.overcomingbias.com/2006/12/you_are_never_e.html
 [12]: https://www.readthesequences.com/WhereToDrawTheBoundary
 [13]: https://www.greaterwrong.com/lw/o1/entropy_and_short_codes#comments "View Less Wrong discussion thread for “Entropy, and Short Codes”"
 [14]: https://www.readthesequences.com/Book-III-TheMachineInTheGhost
 [15]: https://www.readthesequences.com/AHumansGuideToWordsSequence
 [16]: https://www.readthesequences.com/MutualInformationAndDensityInThingspace