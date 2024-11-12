import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: [
      "Wardrobe organization",
      "Basic outfit recommendations",
      "Limited style insights",
    ],
  },
  {
    name: "Pro",
    price: "$19.99",
    features: [
      "Everything in Basic",
      "Advanced AI styling",
      "Unlimited outfit recommendations",
      "Trend forecasting",
    ],
  },
  {
    name: "Premium",
    price: "$29.99",
    features: [
      "Everything in Pro",
      "Personal stylist consultations",
      "Exclusive brand partnerships",
      "Early access to new features",
    ],
  },
];

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Choose Your Plan
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={index === 1 ? "border-blue-500 border-2" : ""}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">{plan.price}</span> /
                  month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {index === 1 ? "Upgrade to Pro" : "Choose Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
