import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [debtAmount, setDebtAmount] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const calculateDebtPlan = () => {
    const debt = parseFloat(debtAmount);
    const payment = parseFloat(monthlyPayment);
    const rate = parseFloat(interestRate) / 100 / 12;

    if (!debt || !payment || debt <= 0 || payment <= 0) {
      toast({
        title: "Ошибка расчёта",
        description: "Пожалуйста, заполните все поля корректно",
        variant: "destructive"
      });
      return;
    }

    const months = Math.ceil(Math.log(payment / (payment - debt * rate)) / Math.log(1 + rate));
    const totalPaid = payment * months;
    const totalInterest = totalPaid - debt;

    setCalculationResult({
      months,
      totalPaid: totalPaid.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      monthlyPayment: payment.toFixed(2)
    });

    toast({
      title: "✅ Расчёт выполнен",
      description: `Срок погашения: ${months} месяцев`
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="TrendingDown" size={32} className="text-accent" />
            <h1 className="text-2xl font-bold">Долг: инструкция для погашения</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#calculator" className="hover:text-accent transition-colors">Калькулятор</a>
            <a href="#steps" className="hover:text-accent transition-colors">Инструкции</a>
            <a href="#vip" className="hover:text-accent transition-colors">VIP-подписка</a>
            <a href="#contact" className="hover:text-accent transition-colors">Контакты</a>
          </nav>
        </div>
      </header>

      <section className="bg-primary text-primary-foreground py-20 animate-fade-in">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">Выход из долговой ямы — это реально</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Профессиональные инструменты и пошаговый план для полного погашения долгов. 
            Финансовая свобода начинается здесь.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl">
              <Icon name="Calculator" size={20} className="mr-2" />
              Рассчитать план
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Icon name="BookOpen" size={20} className="mr-2" />
              Начать обучение
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="animate-scale-in hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Target" size={24} className="text-accent" />
                </div>
                <CardTitle>Системный подход</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Пошаговые инструкции от финансовых экспертов с более чем 10-летним опытом работы с долговыми обязательствами
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-xl transition-shadow" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="LineChart" size={24} className="text-accent" />
                </div>
                <CardTitle>Калькулятор погашения</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Точный расчёт сроков и сумм выплат с учётом процентов. Визуализация прогресса погашения долга
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-xl transition-shadow" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name="Users" size={24} className="text-accent" />
                </div>
                <CardTitle>Персональные консультации</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Доступ к финансовым консультантам для разбора вашей уникальной ситуации и составления индивидуального плана
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="calculator" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Калькулятор погашения долга</h2>
              <p className="text-muted-foreground text-lg">
                Рассчитайте точный план выплат и узнайте срок полного погашения
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="debt">Сумма долга (₽)</Label>
                    <Input
                      id="debt"
                      type="number"
                      placeholder="500000"
                      value={debtAmount}
                      onChange={(e) => setDebtAmount(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment">Ежемесячный платёж (₽)</Label>
                    <Input
                      id="payment"
                      type="number"
                      placeholder="15000"
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Процентная ставка (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.1"
                      placeholder="12.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={calculateDebtPlan} className="w-full" size="lg">
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать план погашения
                </Button>

                {calculationResult && (
                  <div className="mt-8 p-6 bg-accent/5 rounded-lg border-2 border-accent/20 animate-fade-in">
                    <h3 className="text-xl font-bold mb-6 text-center">Ваш план погашения</h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent mb-2">
                          {calculationResult.months}
                        </div>
                        <div className="text-sm text-muted-foreground">месяцев до погашения</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          {calculationResult.totalPaid} ₽
                        </div>
                        <div className="text-sm text-muted-foreground">общая сумма выплат</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-destructive mb-2">
                          {calculationResult.totalInterest} ₽
                        </div>
                        <div className="text-sm text-muted-foreground">переплата по процентам</div>
                      </div>
                    </div>
                    <Progress value={33} className="h-3" />
                    <p className="text-center text-sm text-muted-foreground mt-2">
                      Визуализация прогресса будет доступна в личном кабинете
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="steps" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Пошаговая инструкция</h2>
            <p className="text-muted-foreground text-lg">
              Проверенный алгоритм выхода из долговой ситуации
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="step1" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <span className="text-lg font-semibold">Анализ текущей ситуации</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-14 pt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Составьте полный список всех долговых обязательств с суммами и процентными ставками</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Проанализируйте ваши доходы и расходы за последние 3 месяца</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Определите свободные средства, которые можно направить на погашение долгов</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step2" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <span className="text-lg font-semibold">Выбор стратегии погашения</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-14 pt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Метод снежного кома:</strong> погашайте самый маленький долг первым для психологической мотивации</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span><strong>Метод лавины:</strong> закрывайте долги с наибольшей процентной ставкой для экономии</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Рассмотрите возможность рефинансирования для снижения процентной ставки</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step3" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <span className="text-lg font-semibold">Оптимизация бюджета</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-14 pt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Сократите необязательные расходы (подписки, развлечения, рестораны)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Найдите дополнительные источники дохода (подработка, фриланс, монетизация навыков)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Создайте финансовую подушку безопасности для предотвращения новых долгов</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step4" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <span className="text-lg font-semibold">Переговоры с кредиторами</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-14 pt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Свяжитесь с банками для обсуждения реструктуризации долга или кредитных каникул</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Запросите снижение процентной ставки или списание штрафных санкций</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Все договорённости фиксируйте в письменном виде</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="step5" className="border rounded-lg px-6 bg-card">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <span className="text-lg font-semibold">Контроль и мотивация</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-14 pt-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Ведите ежемесячный учёт погашения долгов и отмечайте прогресс</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Награждайте себя за достижение промежуточных целей (не финансово!)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="CheckCircle2" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>Изучайте финансовую грамотность, чтобы избежать повторения ситуации</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section id="vip" className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">VIP-подписка</h2>
            <p className="text-lg opacity-90">
              Эксклюзивные материалы и персональная поддержка на пути к финансовой свободе
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="monthly">Ежемесячно</TabsTrigger>
                <TabsTrigger value="yearly">Годовой <span className="ml-1 text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">-30%</span></TabsTrigger>
              </TabsList>

              <TabsContent value="monthly">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="relative overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-2xl">Базовый</CardTitle>
                      <CardDescription>Для самостоятельной работы</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">2 990 ₽</span>
                        <span className="text-muted-foreground">/месяц</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Доступ ко всем пошаговым инструкциям</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Калькуляторы и финансовые инструменты</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Шаблоны документов и таблиц</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Еженедельные статьи в блоге</span>
                      </div>
                      <Button className="w-full mt-6">Выбрать план</Button>
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden border-4 border-accent shadow-2xl">
                    <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-bold">
                      ПОПУЛЯРНО
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">Премиум</CardTitle>
                      <CardDescription>Максимальная поддержка</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">7 990 ₽</span>
                        <span className="text-muted-foreground">/месяц</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">Всё из базового плана</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>2 индивидуальные консультации (60 мин)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Персональный план погашения долгов</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Приоритетная поддержка в чате 24/7</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Доступ к закрытому сообществу</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Эксклюзивные вебинары и мастер-классы</span>
                      </div>
                      <Button className="w-full mt-6 bg-accent hover:bg-accent/90">Выбрать план</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="yearly">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-bold">
                      ЭКОНОМИЯ 10 788 ₽
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">Базовый годовой</CardTitle>
                      <CardDescription>12 месяцев доступа</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">25 100 ₽</span>
                        <span className="text-muted-foreground">/год</span>
                      </div>
                      <p className="text-sm text-muted-foreground">2 092 ₽/месяц</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Доступ ко всем пошаговым инструкциям</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Калькуляторы и финансовые инструменты</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Шаблоны документов и таблиц</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Еженедельные статьи в блоге</span>
                      </div>
                      <Button className="w-full mt-6">Выбрать план</Button>
                    </CardContent>
                  </Card>

                  <Card className="relative overflow-hidden border-4 border-accent shadow-2xl">
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-bold">
                      ЭКОНОМИЯ 28 692 ₽
                    </div>
                    <CardHeader>
                      <CardTitle className="text-2xl">Премиум годовой</CardTitle>
                      <CardDescription>12 месяцев максимальной поддержки</CardDescription>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">67 200 ₽</span>
                        <span className="text-muted-foreground">/год</span>
                      </div>
                      <p className="text-sm text-muted-foreground">5 600 ₽/месяц</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="font-semibold">Всё из базового плана</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>24 консультации в год (60 мин)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Персональный план погашения долгов</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Приоритетная поддержка в чате 24/7</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Доступ к закрытому сообществу</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Эксклюзивные вебинары и мастер-классы</span>
                      </div>
                      <Button className="w-full mt-6 bg-accent hover:bg-accent/90">Выбрать план</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
              <p className="text-muted-foreground text-lg">
                Задайте вопрос или запишитесь на консультацию
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  toast({
                    title: "✅ Заявка отправлена",
                    description: "Мы свяжемся с вами в течение 24 часов"
                  });
                }}>
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" placeholder="Иван Иванов" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="ivan@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение</Label>
                    <textarea
                      id="message"
                      className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="Опишите вашу ситуацию..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    <Icon name="Send" className="mr-2" size={20} />
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">О проекте</h3>
              <p className="text-sm opacity-80">
                Профессиональная помощь в погашении долгов и восстановлении финансовой стабильности
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Услуги</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Калькулятор погашения</li>
                <li>Пошаговые инструкции</li>
                <li>Финансовые консультации</li>
                <li>VIP-подписка</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Информация</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Блог</li>
                <li>FAQ</li>
                <li>Политика конфиденциальности</li>
                <li>Договор оферты</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Контакты</h3>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Email: vitaliy-chernov-2012@mail.ru</li>
                <li>Телефон: +7 9294390444</li>
                <li>Telegram: @debt_help_bot</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2026 Долг: инструкция для погашения. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;