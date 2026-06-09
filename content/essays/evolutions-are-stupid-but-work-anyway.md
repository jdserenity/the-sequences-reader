# Evolutions Are Stupid (But Work Anyway)

[Source][1][Markdown][2] · [Talk][3] 

[Home][4][About][5][Search][6][Contents][7] 

# Evolutions Are Stupid  
(But Work Anyway)

❦ 

In the previous essay, I [wrote][8]: 

> Science has a very exact idea of the capabilities of evolution. If you praise evolution one millimeter higher than this, you’re not “fighting on evolution’s side” against creationism. You’re being scientifically inaccurate, full stop. 

In this essay I describe some well-known inefficiencies and limitations of evolutions. I say “evolutions,” plural, because fox evolution works at cross-purposes to rabbit evolution, and neither can talk to snake evolution to learn how to build venomous fangs. 

So I am talking about limitations of evolution here, but this does not mean I am trying to sneak in creationism. This is standard Evolutionary Biology 201. ([583][9] if you must derive the equations.) Evolutions, thus limited, can still explain observed biology; in fact the limitations are necessary to make sense of it. Remember that the wonder of evolutions is not how well they work, but that they work at all. 

Human intelligence is so complicated that no one has any good way to calculate how efficient it is. Natural selection, though not simple, is *simpler than* a human brain; and correspondingly slower and less efficient, as befits the first optimization process ever to exist. In fact, evolutions are simple enough that we can calculate *exactly how stupid* they are. 

Evolutions are slow. How slow? Suppose there’s a beneficial mutation that conveys a fitness advantage of 3%: on average, bearers of this gene have 1.03 times as many children as non-bearers. Assuming that the mutation spreads at all, how long will it take to spread through the whole population? That depends on the population size. A gene conveying a 3% fitness advantage, spreading through a population of 100,000, would require an average of 768 generations to reach universality in the gene pool. A population of 500,000 would require 875 generations. The general formula is 

Generations to fixation = 2 ln(*N*)/*s* , 

where *N* is the population size and (1 + *s*) is the fitness. (If each bearer of the gene has 1.03 times as many children as a non-bearer, *s* = 0.03.) 

Thus, if the population size were 1,000,000—the estimated population in hunter-gatherer times—then it would require 2,763 generations for a gene conveying a 1% advantage to spread through the gene pool.[1][10] 

This should not be surprising; genes have to do all their own work of spreading. There’s no Evolution Fairy who can watch the gene pool and say, “Hm, that gene seems to be spreading rapidly—I should distribute it to everyone.” In a human market economy, someone who is legitimately getting 20% returns on investment—especially if there’s an obvious, clear mechanism behind it—can rapidly acquire more capital from other investors; and others will start duplicate enterprises. Genes have to spread without stock markets or banks or imitators—as if Henry Ford had to make one car, sell it, buy the parts for 1.01 more cars (on average), sell those cars, and keep doing this until he was up to a million cars. 

All this assumes that the gene spreads in the first place. Here the equation is simpler and ends up not depending at all on population size: 

Probability of fixation = 2*s* . 

A mutation conveying a 3% advantage (which is pretty darned large, as mutations go) has a 6% chance of spreading, at least on that occasion.[2][11] Mutations can happen more than once, but in a population of a million with a copying fidelity of 10−8 errors per base per generation, you may have to wait a hundred generations for another chance, and then it still has only a 6% chance of fixating. 

Still, *in the long run*, an evolution has a good shot at getting there eventually. (This is going to be a running theme.) 

*Complex* adaptations take a *very* long time to evolve. First comes allele *A*, which is advantageous of itself, and requires a thousand generations to fixate in the gene pool. *Only* then can another allele *B*, which depends on *A*, begin rising to fixation. A fur coat is not a strong advantage unless the environment has a *statistically reliable* tendency to throw cold weather at you. Well, genes form part of the environment of other genes, and if *B* depends on *A*, then *B* will not have a strong advantage unless *A* is *reliably* present in the genetic environment. 

Let’s say that *B* confers a 5% advantage in the presence of *A*, no advantage otherwise. Then while *A* is still at 1% frequency in the population, *B* only confers its advantage 1 out of 100 times, so the average fitness advantage of *B* is 0.05%, and *B*’s probability of fixation is 0.1%. With a complex adaptation, *first* *A* has to evolve over a thousand generations, *then* *B* has to evolve over another thousand generations, *then* *A∗* evolves over another thousand generations… and several million years later, you’ve got a new complex adaptation. 

Then other evolutions don’t imitate it. If snake evolution develops an amazing new venom, it doesn’t help fox evolution or lion evolution. 

Contrast all this to a human programmer, who can design a new complex mechanism with a hundred interdependent parts over the course of a *single afternoon*. How is this even *possible*? I don’t know all the answer, and my guess is that [neither does science][12]; human brains are much more complicated than evolutions. I could [wave my hands][13] and say something like “goal-directed backward chaining using combinatorial modular representations,” but you would not thereby be enabled to design your own human. Still: Humans can foresightfully design new parts in anticipation of later designing other new parts; produce coordinated simultaneous changes in interdependent machinery; learn by observing single test cases; zero in on problem spots and think abstractly about how to solve them; and prioritize which tweaks are worth trying, rather than waiting for a cosmic ray strike to produce a good one. By the standards of natural selection, this is simply magic. 

Humans can do things that evolutions probably can’t do *period* over the expected lifetime of the universe. As the eminent biologist Cynthia Kenyon once put it at a dinner I had the honor of attending, “One grad student can do things in an hour that evolution could not do in a billion years.” According to biologists’ best current knowledge, evolutions have invented a fully rotating wheel on a grand total of *three* occasions. 

And don’t forget the part where the programmer posts the code snippet to the Internet. 

Yes, some evolutionary handiwork is impressive even by comparison to the best technology of *Homo sapiens*. But our Cambrian explosion only started, we only really began accumulating knowledge, around… what, four hundred years ago? In some ways, biology still excels over the best human technology: we can’t build a self-replicating system the size of a butterfly. In other ways, human technology leaves biology in the dust. We got wheels, we got steel, we got guns, we got knives, we got pointy sticks; we got rockets, we got transistors, we got nuclear power plants. With every passing decade, that balance tips further. 

So, once again: for a human to look to natural selection as inspiration on the art of design is like a sophisticated modern bacterium trying to imitate the first awkward replicator’s biochemistry. The first replicator would be eaten instantly if it popped up in today’s competitive ecology. The same fate would accrue to any human planner who tried making random point mutations to their strategies and waiting 768 iterations of testing to adopt a 3% improvement. 

Don’t praise evolutions one millimeter more than they deserve. 

*Coming up next: More exciting mathematical bounds on evolution!* 

[ ][14]

Dan Graur and Wen-Hsiung Li, *Fundamentals of Molecular Evolution*, 2nd ed. (Sunderland, MA: Sinauer Associates, 2000). [↩][15]

John B. S. Haldane, “A Mathematical Theory of Natural and Artificial Selection,” *Mathematical Proceedings of the Cambridge Philosophical Society* 23 (5 1927): 607–615, doi:10.1017/S0305004100011750. [↩][16]

[The Wonder of Evolution][8] 

[Top][7] 

[Book][17] 

[Sequence][18] 

[No Evolutions for Corporations or Nanodevices][19]

 [1]: https://www.readthesequences.com/Evolutions-Are-Stupid-But-Work-Anyway?action=source "View PmWiki source for “Evolutions Are Stupid (But Work Anyway)”"
 [2]: https://www.readthesequences.com/Evolutions-Are-Stupid-But-Work-Anyway?action=markdown "View “Evolutions Are Stupid (But Work Anyway)” in Markdown format"
 [3]: https://www.readthesequences.com/Talk/Evolutions-Are-Stupid-But-Work-Anyway "View the Talk page for “Evolutions Are Stupid (But Work Anyway)”"
 [4]: https://www.readthesequences.com/
 [5]: https://www.readthesequences.com/About
 [6]: https://www.readthesequences.com/Search
 [7]: https://www.readthesequences.com/Contents
 [8]: https://www.readthesequences.com/The-Wonder-Of-Evolution
 [9]: http://www.tiem.utk.edu/~gavrila/583/583.html
 [10]: #footnote1
 [11]: #footnote2
 [12]: https://www.greaterwrong.com/lw/kj/no_one_knows_what_science_doesnt_know/
 [13]: https://www.readthesequences.com/Guessing-The-Teachers-Password
 [14]: https://www.greaterwrong.com/lw/kt/evolutions_are_stupid_but_work_anyway/#comments "View Less Wrong discussion thread for “Evolutions Are Stupid (But Work Anyway)”"
 [15]: #citation1
 [16]: #citation2
 [17]: https://www.readthesequences.com/Book-III-The-Machine-In-The-Ghost
 [18]: https://www.readthesequences.com/The-Simple-Math-Of-Evolution-Sequence
 [19]: https://www.readthesequences.com/No-Evolutions-For-Corporations-Or-Nanodevices