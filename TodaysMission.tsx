import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, TrendingUp, BookOpen, Target, Lightbulb, FileText, FlaskConical } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressRing';
import { Badge } from '../ui/Badge';
import type { DailyMission, MissionTask } from '../../types';
import { formatTime } from '../../lib/utils';

interface TodaysMissionProps {
  mission: DailyMission;
  onTaskClick: (taskId: string) => void;
  onCompleteTask: (taskId: string) => void;
}

export const TodaysMission: React.FC<TodaysMissionProps> = ({
  mission,
  onTaskClick,
  onCompleteTask,
}) => {
  const getTaskIcon = (type: MissionTask['type']) => {
    switch (type) {
      case 'learn':
        return BookOpen;
      case 'practice':
        return Target;
      case 'revise':
        return Lightbulb;
      case 'assess':
        return FileText;
      case 'recover':
        return FlaskConical;
      default:
        return BookOpen;
    }
  };

  const getTaskColor = (type: MissionTask['type']) => {
    switch (type) {
      case 'learn':
        return 'text-blue-600 bg-blue-100';
      case 'practice':
        return 'text-purple-600 bg-purple-100';
      case 'revise':
        return 'text-yellow-600 bg-yellow-100';
      case 'assess':
        return 'text-green-600 bg-green-100';
      case 'recover':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  const completedTasks = mission.tasks.filter((t) => t.completed).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Today's Learning Mission
            </CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              {completedTasks} of {mission.tasks.length} tasks completed • {formatTime(mission.totalEstimatedTime)} total
            </p>
          </div>
          {mission.completed && (
            <Badge variant="success" size="lg">
              <Check className="w-4 h-4" />
              Completed
            </Badge>
          )}
        </div>
        <ProgressBar progress={mission.progress} className="mt-4" />
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {mission.tasks.map((task, index) => {
            const Icon = getTaskIcon(task.type);

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  task.completed
                    ? 'border-success-200 bg-success-50/50'
                    : 'border-slate-200 hover:border-primary-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Completion Checkbox */}
                  <button
                    onClick={() => !task.completed && onCompleteTask(task.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'bg-success-500 border-success-500'
                        : 'border-slate-300 hover:border-primary-500'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4 text-white" />}
                  </button>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-lg ${getTaskColor(task.type)}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <h4
                          className={`font-semibold ${
                            task.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                          }`}
                        >
                          {task.title}
                        </h4>
                      </div>
                      <Badge variant="info" size="sm">
                        {task.type}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-600 mb-2">{task.description}</p>

                    {/* Reason & Benefit */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-slate-500 font-medium">Why:</span>
                        <span className="text-slate-600">{task.reason}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <TrendingUp className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-green-700">{task.benefit}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(task.estimatedTime)}</span>
                      </div>

                      {!task.completed && (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => onTaskClick(task.id)}
                        >
                          Start
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {mission.completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-success-50 to-green-50 border border-success-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-success-500 flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-success-900">Mission Complete!</h4>
                <p className="text-sm text-success-700">
                  Great work today! Your consistency streak continues.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
