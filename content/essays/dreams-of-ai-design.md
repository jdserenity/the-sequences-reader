<br />
<b>Warning</b>:  Undefined array key 0 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 1 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 2 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 3 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 4 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 0 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 1 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
<br />
<b>Warning</b>:  Undefined array key 2 in <b>/home/public/wiki/cookbook/markdownify/markdownify_extra.php</b> on line <b>295</b><br />
# Dreams of AI Design 

[Source][1][Markdown][2] · [Talk][3] 

[Home][4][About][5][Search][6][Contents][7] 

# Dreams of AI Design

❦ 

After spending a decade or two living inside a mind, you might think you knew a bit about how minds work, right? That’s what quite a few [AGI wannabes][8] (people who think they’ve got what it takes to program an Artificial General Intelligence) seem to have concluded. This, unfortunately, is wrong. 

Artificial Intelligence is fundamentally about reducing the mental to the non-mental. 

You might want to contemplate that sentence for a while. It’s important. 

Living inside a human mind doesn’t teach you the art of [reductionism][9], because nearly all of the work is carried out beneath your sight, by the opaque black boxes of the brain. So far beneath your sight that there is no introspective sense that the black box is there—no internal sensory event marking that the work has been delegated. 

Did Aristotle realize that when he talked about the *telos*, the [final cause][10] of events, that he was delegating predictive labor to his brain’s complicated planning mechanisms—asking, “What would this object do, if it could make plans?” I rather doubt it. Aristotle thought the brain was an organ for cooling the blood—which he did think was important: humans, thanks to their larger brains, were more calm and contemplative. 

￼So there’s an AI design for you! We just need to cool down the computer a lot, so it will be more calm and contemplative, and won’t rush headlong into doing stupid things like modern computers. That’s an example of [fake reductionism][11]. “Humans are more contemplative because their blood is cooler,” I mean. It doesn’t resolve the black box of the word *contemplative*. You can’t predict what a contemplative thing does using a complicated model with internal moving parts composed of merely material, merely causal elements—positive and negative voltages on a transistor being the canonical example of a merely material and causal element of a model. All you can do is *imagine yourself* being contemplative, to get an idea of what a *contemplative* agent does. 

Which is to say that you can *only* reason about “contemplative-ness” by [empathic inference][12]—using your own brain as a black box with the contemplativeness lever pulled, to predict the output of another black box. 

You can imagine another agent being *contemplative*, but again that’s an act of empathic inference—the way this imaginative act works is by adjusting your own brain to run in contemplativeness-mode, not by modeling the other brain neuron by neuron. Yes, that may be more efficient, but it doesn’t let you build a “contemplative” mind from scratch. 

You can say that “cold blood causes contemplativeness” and then you just have [fake causality][13]: You’ve drawn a little arrow from a box reading “cold blood” to a box reading “contemplativeness,” but you haven’t looked *inside* the box—you’re still generating your predictions using empathy. 

You can say that “lots of little neurons, which are all strictly electrical and chemical with no ontologically basic contemplativeness in them, combine into a [complex][14] network that [emergently][15] exhibits contemplativeness.” And that is *still* a fake reduction and you *still* haven’t looked inside the black box. You still can’t say what a “contemplative” thing will do, using a *non-empathic* model. You just took a box labeled “lotsa neurons,” and drew an arrow labeled “emergence” to a black box containing your remembered sensation of contemplativeness, which, when you imagine it, tells your brain to empathize with the box by contemplating. 

So what do *real* reductions look like? 

￼Like the relationship between the *feeling* of evidence-ness, of justificationness, and E. T. Jaynes’s *Probability Theory: The Logic of Science*. You can go around in circles all day, saying how the nature of *evidence* is that it *justifies* some *proposition*, by *meaning* that it’s *more likely* to be *true*, but all of these just invoke your brain’s internal feelings of evidence-ness, justifies-ness, likeliness. That part is easy—the going around in circles part. The part where you go from there to Bayes’s Theorem is *hard*. 

And the fundamental mental ability that lets someone *learn* Artificial Intelligence is the ability to tell the *difference*. So that you know you *aren’t done yet, nor even really started*, when you say, “Evidence is when an observation justifies a belief.” But atoms are not evidential, justifying, meaningful, likely, propositional, or true; they are just atoms. Only things like 

| *P*(*H*|*E*)  | =             | *P*(*E*|*H*) | × | *P*(*H*) |
||
| *P*(¬*H*|*E*) | *P*(*E*|¬*H*) | *P*(¬*H*)    |

count as substantial progress. (And that’s only the first step of the reduction: what are these *E* and *H* objects, if not mysterious black boxes? Where do your hypotheses come from? From your *creativity*? And what’s a hypothesis, when no atom is a hypothesis?) 

Another excellent example of genuine reduction can be found in Judea Pearl’s *Probabilistic Reasoning in Intelligent Systems: Networks of Plausible Inference*.[1][16] You could go around all day in circles talk about how a *cause* is something that *makes* something else happen, and until you understood the nature of conditional independence, you would be helpless to make an AI that reasons about [causation][17]. Because you wouldn’t understand *what* was happening when *your brain mysteriously decided* that if you learned your burglar alarm went off, but you then learned that a small earthquake took place, you would retract your initial conclusion that your house had been burglarized. 

If you want an AI that plays chess, you can go around in circles indefinitely talking about how you want the AI to make *good* moves, which are moves that can be *expected to win the game*, which are moves that are *prudent strategies for defeating the opponent*, et cetera; and while *you* may then have some idea of which moves you [want][18] the AI to make, it’s all for naught until you come up with the notion of a mini-max search tree. 

But *until* you know about search trees, *until* you know about conditional independence, *until* you know about Bayes’s Theorem, then it may still *seem* to you that you have a perfectly good understanding of where good moves and nonmonotonic reasoning and evaluation of evidence come from. It may seem, for example, that they come from cooling the blood. 

And indeed I know many people who believe that *intelligence* is the product of *commonsense knowledge* or *massive parallelism* or *creative destruction* or *intuitive rather than rational reasoning*, or whatever. But all these are only dreams, which do not give you any way to say what intelligence is, or what an intelligence will do next, except by pointing at a human. And when the one goes to build their wondrous AI, they only build a system of [detached levers][19], “knowledge” consisting of LISP tokens labeled apple and the like; or perhaps they build a “massively parallel neural net, just like the human brain.” And are shocked—shocked!—when nothing much happens. 

AI designs made of human parts are only dreams; they can exist in the imagination, but not translate into transistors. This applies specifically to “AI designs” that look like boxes with arrows between them and meaningful-sounding labels on the boxes. (For a truly epic example thereof, see any [Mentifex Diagram][20].) 

Later I will say more upon this subject, but I can go ahead and tell you one of the guiding principles: If you meet someone who says that their AI will do XYZ *just like humans*, do not give them any venture capital. Say to them rather: “I’m sorry, I’ve never seen a human brain, or any other intelligence, and I have no reason as yet to believe that any such thing can exist. Now please explain to me *what* your AI does, and *why* you believe it will do it, without pointing to humans as an example.” Planes would fly just as well, given a fixed design, if birds had never existed; they are not kept aloft by [analogies][21]. 

So now you perceive, I hope, why, if you wanted to teach someone to do *fundamental* work on strong AI—bearing in mind that this is demonstrably a very *difficult* art, which is not learned by a supermajority of students who are just taught existing reductions such as search trees—then you might go on for some length about such matters as [the fine art of reductionism][9], about [playing rationalist’s Taboo][22] to excise problematic [words][23][?][23] and [replace them with their referents][24], about [anthropomorphism][18], and, of course, about [early stopping][25] on [mysterious answers to mysterious questions][26]. 

[![][https://www.readthesequences.com/wiki/uploads/star.svg]][27]

  Pearl, *Probabilistic Reasoning in Intelligent Systems*. [↩︎][28] 

[Detached Lever Fallacy][19] 

[Top][7] 

[Book][29] 

[Sequence][30] 

[The Design Space of Minds-in-General][31]

 [1]: https://www.readthesequences.com/Dreams-Of-AI-Design?action=source "View PmWiki source for “Dreams of AI Design”"
 [2]: https://www.readthesequences.com/Dreams-Of-AI-Design?action=markdown "View “Dreams of AI Design” in Markdown format"
 [3]: https://www.readthesequences.com/Talk/Dreams-Of-AI-Design "View the Talk page for “Dreams of AI Design”"
 [4]: https://www.readthesequences.com/
 [5]: https://www.readthesequences.com/About
 [6]: https://www.readthesequences.com/Search
 [7]: https://www.readthesequences.com/Contents
 [8]: http://www.mail-archive.com/agi@v2.listbox.com/
 [9]: https://www.readthesequences.com/Reductionism
 [10]: https://www.greaterwrong.com/lw/te/three_fallacies_of_teleology/
 [11]: https://www.readthesequences.com/FakeReductionism
 [12]: https://www.greaterwrong.com/lw/sr/the_comedy_of_behaviorism/
 [13]: https://www.readthesequences.com/FakeCausality
 [14]: https://www.readthesequences.com/SayNotComplexity
 [15]: https://www.readthesequences.com/TheFutilityOfEmergence
 [16]: #footnote1
 [17]: https://www.greaterwrong.com/lw/qr/timeless_causality/
 [18]: https://www.readthesequences.com/AnthropomorphicOptimism
 [19]: https://www.readthesequences.com/DetachedLeverFallacy
 [20]: http://mind.sourceforge.net/diagrams.html
 [21]: https://www.greaterwrong.com/lw/rj/surface_analogies_and_deep_causes/
 [22]: https://www.readthesequences.com/TabooYourWords
 [23]: https://www.readthesequences.com/37WaysThatWordsCanBeWrong?action=edit
 [24]: https://www.readthesequences.com/ReplaceTheSymbolWithTheSubstance
 [25]: https://www.readthesequences.com/MotivatedStoppingAndMotivatedContinuation
 [26]: https://www.readthesequences.com/MysteriousAnswersToMysteriousQuestions
 [27]: https://www.greaterwrong.com/lw/tf/dreams_of_ai_design#comments "View Less Wrong discussion thread for “Dreams of AI Design”"
 [28]: #citation1
 [29]: https://www.readthesequences.com/Book-V-MereGoodness
 [30]: https://www.readthesequences.com/FakePreferencesSequence
 [31]: https://www.readthesequences.com/TheDesignSpaceOfMindsInGeneral