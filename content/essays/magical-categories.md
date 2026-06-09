# Magical Categories 

[Source][1][Markdown][2] · [Talk][3] 

[Home][4][About][5][Search][6][Contents][7] 



# Magical Categories

❦ 

> We can design intelligent machines so their primary, innate emotion is unconditional love for all humans. First we can build relatively simple machines that learn to recognize happiness and unhappiness in human facial expressions, human voices and human body language. Then we can hard-wire the result of this learning as the innate emotional values of more complex intelligent machines, positively reinforced when we are happy and negatively reinforced when we are unhappy. 
> 
> —Bill Hibbard (2001), [Super-Intelligent Machines][8][1][9] 

That was published in a peer-reviewed journal, and the author later wrote a whole book about it, so this is not a strawman position I’m discussing here. 

So… um… what could possibly go wrong… 

When I [mentioned][10] (sec. 7.2)[2][11] that Hibbard’s AI ends up tiling the galaxy with tiny molecular smiley-faces, Hibbard wrote an [indignant reply][12] saying: 

> When it is feasible to build a super-intelligence, it will be feasible to build hard-wired recognition of “human facial expressions, human voices and human body language” (to use the words of mine that you quote) that exceed the recognition accuracy of current humans such as you and me, and will certainly not be fooled by “tiny molecular pictures of smiley-faces.” You should not assume such a poor implementation of my idea that it cannot make discriminations that are trivial to current humans. 

As Hibbard also [wrote][13] “Such obvious contradictory assumptions show Yudkowsky’s preference for drama over reason,” I’ll go ahead and mention that Hibbard illustrates a key point: There is no professional certification test you have to take before you are allowed to talk about AI morality. But that is not my primary topic today. Though it is a crucial point about the state of the gameboard that most AGI/FAI wannabes are so *utterly* unsuited to the task that I know no one [cynical enough][14] to imagine the horror without seeing it [firsthand][15]. Even Michael Vassar was probably surprised his first time through. 

No, today I am here to dissect “You should not assume such a poor implementation of my idea that it cannot make discriminations that are trivial to current humans.” 

Once upon a time—I’ve seen this story in several versions and several places, sometimes cited as fact, but I’ve never tracked down an original source—once upon a time, I say, the US Army wanted to use neural networks to automatically detect camouflaged enemy tanks. 

The researchers trained a neural net on 50 photos of camouflaged tanks amid trees, and 50 photos of trees without tanks. Using standard techniques for supervised learning, the researchers trained the neural network to a weighting that correctly loaded the training set—output “yes” for the 50 photos of camouflaged tanks, and output “no” for the 50 photos of forest. 

Now this did not prove, or even imply, that new examples would be classified correctly. The neural network might have “learned” 100 special cases that wouldn’t generalize to new problems. Not, “camouflaged tanks versus forest,” but just, “photo-1 positive, photo-2 negative, photo-3 negative, photo-4 positive…” 

But wisely, the researchers had originally taken 200 photos, 100 photos of tanks and 100 photos of trees, and had used only half in the training set. The researchers ran the neural network on the remaining 100 photos, and *without further training* the neural network classified all remaining photos correctly. Success confirmed! 

The researchers handed the finished work to the Pentagon, which soon handed it back, complaining that in their own tests the neural network did no better than chance at discriminating photos. 

It turned out that in the researchers’ data set, photos of camouflaged tanks had been taken on cloudy days, while photos of plain forest had been taken on sunny days. The neural network had learned to distinguish cloudy days from sunny days, instead of distinguishing camouflaged tanks from empty forest. 

This parable—which might or might not be fact—illustrates one of the most fundamental problems in the field of supervised learning and in fact the whole field of Artificial Intelligence: If the training problems and the real problems have the slightest difference in context—if they are not drawn from the same independently identically distributed process—there is no statistical guarantee from past success to future success. It doesn’t matter if the AI seems to be working great under the training conditions. (This is not an *unsolvable* problem but it is an *unpatchable* problem. There are deep ways to address it—a topic beyond the scope of this essay—but no bandaids.) 

As described in [Superexponential Conceptspace][16], there are exponentially more possible concepts than possible objects, just as the number of possible objects is exponential in the number of attributes. If a black-and-white image is 256 pixels on a side, then the total image is 65,536 pixels. The number of possible images is 265,536. And the number of possible *concepts* that classify images into positive and negative instances—the number of possible *boundaries* you could draw in the space of images—is 2265,536. From this, we see that even supervised learning is almost entirely a matter of inductive bias, without which it would take a minimum of 265,536 classified examples to discriminate among 2265,536 possible concepts—even if classifications are constant over time. 

So let us now turn again to: 

> First we can build relatively simple machines that learn to recognize happiness and unhappiness in human facial expressions, human voices and human body language. Then we can hard-wire the result of this learning as the innate emotional values of more complex intelligent machines, positively reinforced when we are happy and negatively reinforced when we are unhappy. 

and 

> When it is feasible to build a super-intelligence, it will be feasible to build hard-wired recognition of “human facial expressions, human voices and human body language” (to use the words of mine that you quote) that exceed the recognition accuracy of current humans such as you and me, and will certainly not be fooled by “tiny molecular pictures of smiley-faces.” You should not assume such a poor implementation of my idea that it cannot make discriminations that are trivial to current humans. 

It’s trivial to *discriminate* a photo of a picture with a camouflaged tank, and a photo of an empty forest, in the sense of determining that the two photos are not identical. They’re different pixel arrays with different 1s and 0s in them. Discriminating between them is as simple as testing the arrays for equality. 

*Classifying* new photos into positive and negative instances of “smile,” by reasoning from a set of training photos classified positive or negative, is a different order of problem. 

When you’ve got a 256×256 image from a real-world camera, and the image turns out to depict a camouflaged tank, there is no additional 65,537th bit denoting the positiveness—no tiny little XML tag that says “This image is [inherently][17] positive.” It’s only a positive example relative to some *particular* concept. 

But for any non-Vast amount of training data—any training data that does not include the *exact* bitwise image now seen—there are *super*exponentially many possible concepts compatible with previous classifications. 

For the AI, choosing or weighting from among superexponential possibilities is a matter of inductive bias. Which may not match what the user has in mind. The gap between these two example-classifying processes—induction on the one hand, and the user’s actual goals on the other—is not trivial to cross. 

Let’s say the AI’s training data is: 

Dataset 1: 

Smile\_1, Smile\_2, Smile_3 

Frown\_1, Cat\_1, Frown\_2, Frown\_3, Cat\_2, Boat\_1, Car\_1, Frown\_5. 

Now the AI grows up into a superintelligence, and encounters this data: 

Dataset 2: 

Frown\_6, Cat\_3, Smile\_4, Galaxy\_1, Frown\_7, Nanofactory\_1, Molecular\_Smileyface\_1, Cat\_4, Molecular\_Smileyface\_2, Galaxy\_2, Nanofactory_2. 

It is not a property *of these datasets* that the inferred classification *you would prefer* is: 

Smile\_1, Smile\_2, Smile\_3, Smile\_4 

Frown\_1, Cat\_1, Frown\_2, Frown\_3, Cat\_2, Boat\_1, Car\_1, Frown\_5, Frown\_6, Cat\_3, Galaxy\_1, Frown\_7, Nanofactory\_1, Molecular\_Smileyface\_1, Cat\_4, Molecular\_Smileyface\_2, Galaxy\_2, Nanofactory\_2. 

rather than 

Smile\_1, Smile\_2, Smile\_3, Molecular\_Smileyface\_1, Molecular\_Smileyface\_2, Smile\_4 

Frown\_1, Cat\_1, Frown\_2, Frown\_3, Cat\_2, Boat\_1, Car\_1, Frown\_5, Frown\_6, Cat\_3, Galaxy\_1, Frown\_7, Nanofactory\_1, Cat\_4, Galaxy\_2, Nanofactory\_2. 

Both of these classifications are compatible with the training data. The number of *concepts* compatible with the training data will be much larger, since more than one concept can project the same shadow onto the combined dataset. If the space of possible concepts includes the space of possible computations that classify instances, the space is infinite. 

Which classification will the AI choose? This is not an inherent property of the training data; it is a property of how the AI performs induction. 

Which is the *correct* classification? This is not a property of the training data; it is a property of your preferences (or, if you prefer, a property of the [idealized abstract dynamic][18] you name [“right”][19]). 

The concept that *you wanted* cast its shadow onto the training data as you yourself labeled each instance + or -, drawing on your own intelligence and preferences to do so. That’s what supervised learning is all about—providing the AI with labeled training examples that project a shadow of the causal process that generated the labels. 

But unless the training data is drawn from *exactly* the same context as the real-life, the training data will be “shallow” in some sense, a projection from a much higher-dimensional space of possibilities. 

The AI never saw a tiny molecular smileyface during its dumber-than-human training phase, or it never saw a tiny little agent with a happiness counter set to a googolplex. Now *you*, finally presented with a tiny molecular smiley—or perhaps a very realistic tiny sculpture of a human face—know at once that this is not what *you* want to count as a smile. But that judgment reflects an [unnatural category][20], one whose classification boundary depends sensitively on your [complicated values][21]. It is your own plans and desires that are at work when you say “No!” 

Hibbard knows instinctively that a tiny molecular smileyface isn’t a “smile,” because he knows that’s not what he wants his putative AI to do. If someone else were presented with a different task, like classifying artworks, they might feel that the Mona Lisa was obviously smiling—as opposed to frowning, say—even though it’s only paint. 

As the case of Terri Schiavo illustrates, [technology enables new borderline cases][20] that throw us into new, essentially *moral* dilemmas. Showing an AI pictures of living and dead humans as they existed during the age of Ancient Greece will not enable the AI to make a *moral* decision as to whether switching off Terri’s life support is murder. That information isn’t present in the dataset even inductively! Terri Schiavo raises new moral questions, appealing to new moral considerations, that you wouldn’t need to think about while classifying photos of living and dead humans from the time of Ancient Greece. No one was on life support then, still breathing with a brain half fluid. So such considerations play no role in the causal process that you use to classify the ancient-Greece training data, and hence cast no shadow on the training data, and hence are not accessible by induction on the training data. 

As a matter of formal fallacy, I see two anthropomorphic errors on display. 

The first fallacy is *underestimating the [complexity][22]* of a concept we develop for the sake of its value. The borders of the concept will depend on many values and probably on-the-fly moral reasoning, if the borderline case is of a kind we haven’t seen before. But all that takes place invisibly, in the background; to Hibbard it just seems that a tiny molecular smileyface is just obviously not a smile. And we don’t generate *all* possible borderline cases, so we don’t think of all the considerations that might play a role in redefining the concept, but haven’t yet played a role in defining it. Since people underestimate the [complexity][22] of their concepts, they underestimate the difficulty of inducing the concept from training data. (And also the difficulty of describing the concept directly—see [The Hidden Complexity of Wishes][23].) 

The second fallacy is [anthropomorphic optimism][24]. Since Bill Hibbard uses his own intelligence to generate options and plans ranking high in his preference ordering, he is incredulous at the idea that a superintelligence could classify never-before-seen tiny molecular smileyfaces as a positive instance of “smile.” As Hibbard uses the “smile” concept (to describe desired behavior of superintelligences), extending “smile” to cover tiny molecular smileyfaces would rank very low in his preference ordering; it would be a *stupid* thing to do—inherently so, as [a property of the concept itself][17]—so surely a superintelligence would not do it; this is just obviously the *wrong* classification. Certainly a *superintelligence* can see [which heaps of pebbles are correct or incorrect][25]. 

Why, Friendly AI isn’t hard at all! All you need is an AI that does what’s *good*! Oh, sure, not every possible mind does what’s *good*—but in this case, we just *program* the superintelligence to do what’s *good*. All you need is a neural network that sees a few instances of *good* things and not-*good* things, and you’ve got a classifier. Hook that up to an expected utility maximizer and you’re done! 

I shall call this the fallacy of magical categories—simple little words that turn out to carry all the desired functionality of the AI. Why not program a chess player by running a neural network (that is, a magical category-absorber) over a set of winning and losing sequences of chess moves, so that it can generate “winning” sequences? Back in the 1950s it was believed that AI might be that simple, but *this turned out not to be the case*. 

The novice thinks that Friendly AI is a problem of *coercing* an AI to make it do what *you* want, rather than the AI following its own desires. But the real problem of Friendly AI is one of *communication*—transmitting category boundaries, like “good,” that can’t be fully delineated in any training data you can give the AI during its childhood. Relative to the full space of possibilities the Future encompasses, we *ourselves* haven’t imagined most of the borderline cases, and would have to engage in full-fledged moral arguments to figure them out. To solve the FAI problem you have to step outside the paradigm of induction on human-labeled training data *and* the paradigm of human-generated intensional definitions. 

Of course, even if Hibbard did succeed in conveying to an AI a concept that covers exactly every human facial expression that Hibbard would label a “smile,” and excludes every facial expression that Hibbard wouldn’t label a “smile”… 

Then the resulting AI would *appear* to work correctly during its childhood, when it was weak enough that it could only generate smiles by pleasing its programmers. 

When the AI progressed to the point of superintelligence and its own nanotechnological infrastructure, it would rip off your face, wire it into a permanent smile, and start xeroxing. 

The deep answers to such problems are beyond the scope of this essay, but it is a general principle of Friendly AI that there are no bandaids. In 2004, Hibbard modified his proposal to assert that expressions of human agreement should reinforce the definition of happiness, and then happiness should reinforce other behaviors. Which, even if it worked, just leads to the AI xeroxing a horde of things similar-in-its-conceptspace to programmers saying 

“Yes, that’s happiness!” about hydrogen atoms—hydrogen atoms are easy to make. 

Link to my discussion with Hibbard [here][13]. You already got the important parts. 

[![][https://www.readthesequences.com/wiki/uploads/star.svg]][26]

  Bill Hibbard, “Super-Intelligent Machines,” *ACM SIGGRAPH Computer Graphics* 35, no. 1 (2001): 13–15, <http://www.siggraph.org/publications/newsletter/issues/v35/v35n1.pdf>. [↩︎][27] 

  Eliezer Yudkowsky, “Artificial Intelligence as a Positive and Negative Factor in Global Risk,” in Bostrom and Ćirković, *Global Catastrophic Risks*, 308–345. [↩︎][28] 

[Morality as Fixed Computation][29] 

[Top][7] 

[Book][30] 

[Sequence][31] 

[The True Prisoner’s Dilemma][32]

 [1]: https://www.readthesequences.com/Magical-Categories?action=source "View PmWiki source for “Magical Categories”"
 [2]: https://www.readthesequences.com/Magical-Categories?action=markdown "View “Magical Categories” in Markdown format"
 [3]: https://www.readthesequences.com/Talk/Magical-Categories "View the Talk page for “Magical Categories”"
 [4]: https://www.readthesequences.com/
 [5]: https://www.readthesequences.com/About
 [6]: https://www.readthesequences.com/Search
 [7]: https://www.readthesequences.com/Contents
 [8]: http://www.ssec.wisc.edu/~billh/visfiles.html
 [9]: #footnote1
 [10]: http://intelligence.org/files/AIPosNegFactor.pdf
 [11]: #footnote2
 [12]: http://www.sl4.org/archive/0606/15138.html
 [13]: http://www.ssec.wisc.edu/~billh/g/AIRisk_Reply.html
 [14]: https://www.readthesequences.com/PlanningFallacy
 [15]: http://www.mail-archive.com/agi@v2.listbox.com/
 [16]: https://www.readthesequences.com/SuperexponentialConceptspaceAndSimpleWords
 [17]: https://www.readthesequences.com/MindProjectionFallacy
 [18]: https://www.greaterwrong.com/lw/t0/abstracted_idealized_dynamics/
 [19]: https://www.greaterwrong.com/lw/sm/the_meaning_of_right/
 [20]: https://www.greaterwrong.com/lw/tc/unnatural_categories/
 [21]: https://www.readthesequences.com/ThouArtGodshatter
 [22]: https://www.readthesequences.com/OccamsRazor
 [23]: https://www.readthesequences.com/TheHiddenComplexityOfWishes
 [24]: https://www.readthesequences.com/AnthropomorphicOptimism
 [25]: https://www.readthesequences.com/SortingPebblesIntoCorrectHeaps
 [26]: https://www.greaterwrong.com/lw/td/magical_categories#comments "View Less Wrong discussion thread for “Magical Categories”"
 [27]: #citation1
 [28]: #citation2
 [29]: https://www.readthesequences.com/MoralityAsFixedComputation
 [30]: https://www.readthesequences.com/Book-V-MereGoodness
 [31]: https://www.readthesequences.com/ValueTheorySequence
 [32]: https://www.readthesequences.com/TheTruePrisonersDilemma