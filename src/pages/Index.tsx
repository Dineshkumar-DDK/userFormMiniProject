import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";

export default function Index() {
    return (
        <div className='bg-background min-h-screen'>
            <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-6xl ">
                    <div className="flex item-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 bg-primary rounded-lg flex items-center justify-center">
                                <Users className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold text-foreground leading-tight">User</h1>
                                <p className="text-xs text-muted-foreground">count</p>
                            </div>
                        </div>
                        <Button size="sm" className='gap-2'>
                            <Plus className="h-4 w-4" />
                            Add user
                        </Button>
                    </div>

                </div>
            </header>
            <main>

            </main>
        </div>
    )
}